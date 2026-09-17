// NOTE: this file is imported by client components (dashboard pages), so it
// must never import Node-only modules like "crypto" — doing so once here
// pulled a ~325KB browser crypto polyfill into every page that imports
// anything from this file. Default-data ids below are deterministic
// strings for exactly that reason; only the KV-side store (server-only)
// uses crypto.randomUUID() for anything generated at runtime.

// ---------- Types ----------

export type TaskDef = { id: string; label: string; custom?: boolean };
export type DailyPlanSection = "morning" | "afternoon" | "evening";
export type DailyPlan = Record<DailyPlanSection, TaskDef[]>;

export type ChecklistItem = { id: string; label: string; done: boolean };
export type Checklist = { id: string; title: string; items: ChecklistItem[]; custom: boolean };

export type JournalEntry = {
  id: string;
  body: string;
  prompt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Favorites = { guides: string[]; checklists: string[]; notes: string[] };

/** One entry per calendar day (UTC, YYYY-MM-DD): which task ids were completed that day. */
export type ActivityLog = Record<string, string[]>;

export type WellnessDashboardState = {
  todaysFocus: TaskDef[];
  dailyPlan: DailyPlan;
  checklists: Checklist[];
  journal: JournalEntry[];
  favorites: Favorites;
  activity: ActivityLog;
  updatedAt: string;
};

// ---------- Defaults ----------

export const DEFAULT_TODAYS_FOCUS: TaskDef[] = [
  { id: "focus-read", label: "Read for 10 minutes" },
  { id: "focus-checklist", label: "Complete daily checklist" },
  { id: "focus-journal", label: "Write in my journal" },
  { id: "focus-moment", label: "Take a moment for myself" },
];

export const DEFAULT_DAILY_PLAN: DailyPlan = {
  morning: [
    { id: "am-water", label: "Drink water" },
    { id: "am-reading", label: "10-minute reading" },
    { id: "am-stretch", label: "Morning stretch" },
    { id: "am-meditation", label: "Meditation" },
  ],
  afternoon: [
    { id: "pm-meal", label: "Healthy meal" },
    { id: "pm-walk", label: "Walk" },
    { id: "pm-hydration", label: "Hydration check" },
  ],
  evening: [
    { id: "ev-journal", label: "Journal" },
    { id: "ev-screenfree", label: "Screen-free time" },
    { id: "ev-reflection", label: "Evening reflection" },
    { id: "ev-sleep", label: "Sleep preparation" },
  ],
};

function defaultItems(checklistId: string, labels: string[]): ChecklistItem[] {
  return labels.map((label, i) => ({ id: `${checklistId}-${i}`, label, done: false }));
}

export const DEFAULT_CHECKLISTS: Omit<Checklist, "custom">[] = [
  {
    id: "morning-routine",
    title: "Morning Routine",
    items: defaultItems("morning-routine", [
      "Wake up at a consistent time",
      "Drink a glass of water",
      "Stretch or move for a few minutes",
      "Plan today's priorities",
    ]),
  },
  {
    id: "sleep-routine",
    title: "Sleep Routine",
    items: defaultItems("sleep-routine", ["Dim the lights", "Screens off", "Wind-down activity", "Consistent bedtime"]),
  },
  {
    id: "healthy-eating",
    title: "Healthy Eating",
    items: defaultItems("healthy-eating", [
      "Plan tomorrow's meals",
      "Include a vegetable at each meal",
      "Drink enough water",
      "Check the grocery list",
    ]),
  },
  {
    id: "mental-wellness",
    title: "Mental Wellness",
    items: defaultItems("mental-wellness", [
      "Check in with how I'm feeling",
      "Use one calming tool",
      "Limit doom-scrolling",
      "Reach out to someone",
    ]),
  },
  {
    id: "self-care",
    title: "Self-Care",
    items: defaultItems("self-care", [
      "Take a few minutes for myself",
      "Do something I enjoy",
      "Rest without guilt",
      "Say no to one thing today",
    ]),
  },
  {
    id: "weekly-reset",
    title: "Weekly Reset",
    items: defaultItems("weekly-reset", ["Tidy my space", "Plan next week", "Review my goals", "Prep meals for the week"]),
  },
  {
    id: "monthly-wellness-review",
    title: "Monthly Wellness Review",
    items: defaultItems("monthly-wellness-review", [
      "Review this month's progress",
      "Note what worked well",
      "Note what I want to adjust",
      "Set one focus for next month",
    ]),
  },
];

const QUOTES = [
  "A healthier, happier you is a journey, not a destination.",
  "Small steps make a big difference.",
  "Consistency is quieter than motivation, and it lasts longer.",
  "You don't need a perfect day — you need a next step.",
  "Rest is part of the routine, not a break from it.",
  "Progress is still progress, even when it's slow.",
  "Take care of yourself the way you'd take care of someone you love.",
];

export const JOURNAL_PROMPTS = [
  "How am I feeling today?",
  "What went well today?",
  "What do I want to improve?",
  "What am I grateful for?",
];

// ---------- Date helpers ----------

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

/** Deterministic "quote of the day" — same quote all day, rotates daily. */
export function getDailyQuote(dateISO: string = todayISO()): string {
  const seed = dateISO.split("-").reduce((sum, part) => sum + parseInt(part, 10), 0);
  return QUOTES[seed % QUOTES.length];
}

export function greetingForNow(): string {
  const hour = new Date().getUTCHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
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

/**
 * Deliberately locale-independent (UTC-based, no Intl/toLocaleDateString) so
 * this renders identically on the server and the client — using the
 * viewer's locale here would risk a hydration mismatch.
 */
export function formatDateLong(date: Date = new Date()): string {
  return `${WEEKDAYS[date.getUTCDay()]}, ${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}`;
}

// ---------- Empty state ----------

export function emptyDashboardState(): WellnessDashboardState {
  return {
    todaysFocus: DEFAULT_TODAYS_FOCUS,
    dailyPlan: DEFAULT_DAILY_PLAN,
    checklists: DEFAULT_CHECKLISTS.map((c) => ({ ...c, custom: false })),
    journal: [],
    favorites: { guides: [], checklists: [], notes: [] },
    activity: {},
    updatedAt: new Date().toISOString(),
  };
}

// ---------- Derived stats ----------

export type DashboardStats = {
  dailyPercent: number;
  weeklyPercent: number;
  completedToday: number;
  totalToday: number;
  currentStreak: number;
  longestStreak: number;
  totalWellnessDays: number;
  totalCompletedTasks: number;
  journalEntryCount: number;
  /** Last 7 calendar days (Mon–Sun of the current week), each 0–100. */
  weekChart: { label: string; date: string; percent: number }[];
};

function allTaskIdsFor(state: WellnessDashboardState): string[] {
  return [
    ...state.todaysFocus.map((t) => t.id),
    ...state.dailyPlan.morning.map((t) => t.id),
    ...state.dailyPlan.afternoon.map((t) => t.id),
    ...state.dailyPlan.evening.map((t) => t.id),
  ];
}

function percentFor(completedIds: string[] | undefined, totalIds: string[]): number {
  if (totalIds.length === 0) return 0;
  const completed = (completedIds ?? []).filter((id) => totalIds.includes(id));
  return Math.round((completed.length / totalIds.length) * 100);
}

function mondayOfWeek(dateISO: string): Date {
  const d = new Date(`${dateISO}T00:00:00Z`);
  const day = d.getUTCDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}

export function computeStats(state: WellnessDashboardState): DashboardStats {
  const totalIds = allTaskIdsFor(state);
  const today = todayISO();

  const completedToday = (state.activity[today] ?? []).filter((id) => totalIds.includes(id)).length;
  const dailyPercent = percentFor(state.activity[today], totalIds);

  // Weekly = average of the last 7 calendar days (today back 6 days).
  const last7 = Array.from({ length: 7 }, (_, i) => isoDaysAgo(6 - i));
  const weeklyAvg =
    last7.reduce((sum, d) => sum + percentFor(state.activity[d], totalIds), 0) / last7.length;

  // Week chart aligned Monday–Sunday for the current week.
  const monday = mondayOfWeek(today);
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  const weekChart = labels.map((label, i) => {
    const d = new Date(monday);
    d.setUTCDate(d.getUTCDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const isFuture = iso > today;
    return { label, date: iso, percent: isFuture ? -1 : percentFor(state.activity[iso], totalIds) };
  });

  // Streaks — a "wellness day" is any day with at least one completed task.
  const activeDays = Object.entries(state.activity)
    .filter(([, ids]) => ids.length > 0)
    .map(([date]) => date)
    .sort();
  const activeDaySet = new Set(activeDays);

  let currentStreak = 0;
  const cursor = new Date(`${today}T00:00:00Z`);
  // Today doesn't have to be completed yet for the streak to still be "alive"
  // through yesterday, but if today has activity it counts too.
  if (!activeDaySet.has(today)) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
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

  const totalCompletedTasks = Object.values(state.activity).reduce((sum, ids) => sum + ids.length, 0);

  return {
    dailyPercent,
    weeklyPercent: Math.round(weeklyAvg),
    completedToday,
    totalToday: totalIds.length,
    currentStreak,
    longestStreak,
    totalWellnessDays: activeDays.length,
    totalCompletedTasks,
    journalEntryCount: state.journal.length,
    weekChart,
  };
}
