// NOTE: imported by client components too — never import Node-only modules
// like "crypto" here (see the same note in wellnessDashboard.ts).

// ---------- Types ----------

export type MealSlotLabel = "Breakfast" | "Lunch" | "Dinner" | "Snack" | string;

export type ScheduleSlot = {
  id: string;
  label: MealSlotLabel;
  time: string; // "HH:MM", 24h
  /** True once the user has hand-edited this slot's time; recalculating
   * suggested times must never silently overwrite it. */
  timeEdited: boolean;
  custom: boolean;
};

export type MealEntry = {
  mealName: string;
  status: "planned" | "completed";
};

/** One calendar day (UTC, YYYY-MM-DD) -> per-slot meal entry. */
export type DayMeals = Record<string, MealEntry>;

export type MealTemplate = { id: string; name: string; note: string };

export type ChecklistItem = { id: string; label: string; done: boolean };

export type CheckIn = { note: string; updatedAt: string };

export type MealPlannerGoal =
  | "eat-regularly"
  | "plan-ahead"
  | "reduce-snacking"
  | "consistent-routine"
  | "easier-shopping"
  | "prep-ahead";

export type MealPlannerSetup = {
  onboarded: boolean;
  wakeTime: string | null; // "HH:MM"
  bedtime: string | null;
  numberOfMeals: 2 | 3 | 4;
  numberOfSnacks: 0 | 1 | 2;
  goals: MealPlannerGoal[];
};

export type ReminderPrefs = {
  enabled: boolean;
  remindMinutesBefore: number;
};

export type MealPlannerState = {
  setup: MealPlannerSetup;
  scheduleSlots: ScheduleSlot[];
  mealsByDate: Record<string, DayMeals>;
  mealTemplates: MealTemplate[];
  groceryList: ChecklistItem[];
  prepList: ChecklistItem[];
  checkIns: Record<string, CheckIn>;
  reminderPrefs: ReminderPrefs;
  updatedAt: string;
};

// ---------- Goal labels (for UI) ----------

export const GOAL_LABELS: Record<MealPlannerGoal, string> = {
  "eat-regularly": "Eat more regularly",
  "plan-ahead": "Plan meals ahead",
  "reduce-snacking": "Reduce random snacking",
  "consistent-routine": "Create a more consistent routine",
  "easier-shopping": "Make grocery shopping easier",
  "prep-ahead": "Prepare meals ahead",
};

// ---------- Defaults ----------

export function emptyMealPlannerState(): MealPlannerState {
  return {
    setup: {
      onboarded: false,
      wakeTime: null,
      bedtime: null,
      numberOfMeals: 3,
      numberOfSnacks: 1,
      goals: [],
    },
    scheduleSlots: [],
    mealsByDate: {},
    mealTemplates: [],
    groceryList: [],
    prepList: [],
    checkIns: {},
    reminderPrefs: { enabled: false, remindMinutesBefore: 15 },
    updatedAt: new Date().toISOString(),
  };
}

// ---------- Date helpers ----------

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Locale-independent (UTC-based) so server and client render identically. */
export function formatDateLong(dateISO: string): string {
  const d = new Date(`${dateISO}T00:00:00Z`);
  return `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

export function formatTime12h(time24: string): string {
  const [hStr, mStr] = time24.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (Number.isNaN(h) || Number.isNaN(m)) return time24;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

/** Mon–Sun dates for the week containing `dateISO`. */
export function weekDatesFor(dateISO: string): string[] {
  const d = new Date(`${dateISO}T00:00:00Z`);
  const day = d.getUTCDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setUTCDate(monday.getUTCDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setUTCDate(date.getUTCDate() + i);
    return date.toISOString().slice(0, 10);
  });
}

// ---------- Schedule generation ----------

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map((v) => parseInt(v, 10));
  return h * 60 + m;
}

function toTimeString(minutes: number): string {
  const wrapped = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const MEAL_LABELS_BY_COUNT: Record<2 | 3 | 4, string[]> = {
  2: ["Breakfast", "Dinner"],
  3: ["Breakfast", "Lunch", "Dinner"],
  4: ["Breakfast", "Lunch", "Dinner", "Evening Meal"],
};

/**
 * Deterministic suggested schedule from wake/bed times and meal/snack
 * counts. Spreads main meals evenly across the waking window, and places
 * snacks at the midpoints between consecutive meals. Pure function — same
 * inputs always produce the same output, so it's safe to re-run on demand
 * ("Recalculate Suggested Times").
 */
export function generateSuggestedSchedule(
  wakeTime: string,
  bedtime: string,
  numberOfMeals: 2 | 3 | 4,
  numberOfSnacks: 0 | 1 | 2
): { label: string; time: string }[] {
  const wake = toMinutes(wakeTime);
  let bed = toMinutes(bedtime);
  if (bed <= wake) bed += 1440; // bedtime past midnight

  const wakingWindow = bed - wake;
  const mealLabels = MEAL_LABELS_BY_COUNT[numberOfMeals];

  // Meals start 1h after waking and end 2.5h before bed, spread evenly.
  const start = wake + 60;
  const end = Math.max(start + 60, bed - 150);
  const span = end - start;
  const mealTimes = mealLabels.map((label, i) => ({
    label,
    time: toTimeString(start + Math.round((span * i) / Math.max(1, mealLabels.length - 1))),
  }));

  if (numberOfSnacks === 0 || mealTimes.length < 2) {
    return mealTimes;
  }

  // Snacks at the midpoints between consecutive meals (first two gaps).
  const snacks: { label: string; time: string }[] = [];
  for (let i = 0; i < Math.min(numberOfSnacks, mealTimes.length - 1); i++) {
    const a = toMinutes(mealTimes[i].time);
    const b = toMinutes(mealTimes[i + 1].time);
    snacks.push({ label: "Snack", time: toTimeString(Math.round((a + b) / 2)) });
  }

  return [...mealTimes, ...snacks].sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
}

// ---------- Derived stats ----------

export type MealPlannerStats = {
  completedToday: number;
  totalToday: number;
  dailyPercent: number;
  currentStreak: number;
  longestStreak: number;
  totalTrackedDays: number;
  last30: { date: string; percent: number }[];
};

function percentForDay(day: DayMeals | undefined, totalSlots: number): number {
  if (!day || totalSlots === 0) return 0;
  const completed = Object.values(day).filter((m) => m.status === "completed").length;
  return Math.round((completed / totalSlots) * 100);
}

export function computeMealPlannerStats(state: MealPlannerState): MealPlannerStats {
  const totalSlots = state.scheduleSlots.length;
  const today = todayISO();
  const todayMeals = state.mealsByDate[today];
  const completedToday = todayMeals ? Object.values(todayMeals).filter((m) => m.status === "completed").length : 0;

  const activeDays = Object.entries(state.mealsByDate)
    .filter(([, day]) => Object.values(day).some((m) => m.status === "completed"))
    .map(([date]) => date)
    .sort();
  const activeDaySet = new Set(activeDays);

  let currentStreak = 0;
  const cursor = new Date(`${today}T00:00:00Z`);
  if (!activeDaySet.has(today)) cursor.setUTCDate(cursor.getUTCDate() - 1);
  while (activeDaySet.has(cursor.toISOString().slice(0, 10))) {
    currentStreak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  let longestStreak = 0;
  let running = 0;
  let prevDate: Date | null = null;
  for (const date of activeDays) {
    const d = new Date(`${date}T00:00:00Z`);
    if (prevDate) {
      const diffDays = Math.round((d.getTime() - prevDate.getTime()) / 86400000);
      running = diffDays === 1 ? running + 1 : 1;
    } else {
      running = 1;
    }
    longestStreak = Math.max(longestStreak, running);
    prevDate = d;
  }

  const last30 = Array.from({ length: 30 }, (_, i) => {
    const date = isoDaysAgo(29 - i);
    return { date, percent: percentForDay(state.mealsByDate[date], totalSlots) };
  });

  return {
    completedToday,
    totalToday: totalSlots,
    dailyPercent: percentForDay(todayMeals, totalSlots),
    currentStreak,
    longestStreak,
    totalTrackedDays: activeDays.length,
    last30,
  };
}
