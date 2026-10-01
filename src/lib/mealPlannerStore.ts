import { randomUUID } from "crypto";
import { getKv, withLock } from "@/lib/kv";
import {
  MealPlannerState,
  MealPlannerGoal,
  ScheduleSlot,
  emptyMealPlannerState,
  generateSuggestedSchedule,
  todayISO,
} from "@/lib/mealPlanner";

const MAX_LABEL_LENGTH = 80;
const MAX_NOTE_LENGTH = 2000;
const MAX_SCHEDULE_SLOTS = 12;
const MAX_TEMPLATES = 50;
const MAX_CHECKLIST_ITEMS = 60;
const MAX_TRACKED_DAYS = 60;
const MAX_REMINDER_MINUTES = 240;

const GOALS: MealPlannerGoal[] = [
  "eat-regularly",
  "plan-ahead",
  "reduce-snacking",
  "consistent-routine",
  "easier-shopping",
  "prep-ahead",
];

function key(token: string): string {
  return `wellness-meal-planner:${token}`;
}

function lockKey(token: string): string {
  return `lock:wellness-meal-planner:${token}`;
}

export async function getMealPlannerState(token: string): Promise<MealPlannerState> {
  const stored = await getKv().get<MealPlannerState>(key(token));
  return stored ?? emptyMealPlannerState();
}

async function save(token: string, state: MealPlannerState): Promise<MealPlannerState> {
  const next = { ...state, updatedAt: new Date().toISOString() };
  await getKv().set(key(token), next);
  return next;
}

function trimTrackedDays(state: MealPlannerState): MealPlannerState {
  const dates = Object.keys(state.mealsByDate).sort();
  if (dates.length <= MAX_TRACKED_DAYS) return state;
  const toDrop = dates.slice(0, dates.length - MAX_TRACKED_DAYS);
  const mealsByDate = { ...state.mealsByDate };
  for (const d of toDrop) delete mealsByDate[d];
  return { ...state, mealsByDate };
}

function isValidTime(value: unknown): value is string {
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function isLabelOk(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= MAX_LABEL_LENGTH;
}

// ---------- Setup ----------

export async function saveSetup(
  token: string,
  input: {
    wakeTime: string;
    bedtime: string;
    numberOfMeals: 2 | 3 | 4;
    numberOfSnacks: 0 | 1 | 2;
    goals: string[];
    /** Final (possibly user-edited) Screen 5 times, in the same order as the
     * generated suggestion. Falls back to the raw suggestion when omitted. */
    slots?: { label: string; time: string }[];
  }
): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    if (!isValidTime(input.wakeTime) || !isValidTime(input.bedtime)) {
      throw new Error("Invalid time.");
    }
    if (![2, 3, 4].includes(input.numberOfMeals)) throw new Error("Invalid meal count.");
    if (![0, 1, 2].includes(input.numberOfSnacks)) throw new Error("Invalid snack count.");
    const goals = input.goals.filter((g): g is MealPlannerGoal => GOALS.includes(g as MealPlannerGoal));

    const state = await getMealPlannerState(token);
    const suggested = generateSuggestedSchedule(
      input.wakeTime,
      input.bedtime,
      input.numberOfMeals,
      input.numberOfSnacks
    );
    const final =
      input.slots && input.slots.length === suggested.length
        ? input.slots.filter((s) => isLabelOk(s.label) && isValidTime(s.time))
        : suggested;
    if (final.length !== suggested.length) throw new Error("Invalid schedule.");

    const scheduleSlots: ScheduleSlot[] = final.map((s, i) => ({
      id: randomUUID(),
      label: s.label,
      time: s.time,
      timeEdited: s.time !== suggested[i].time,
      custom: false,
    }));

    return save(token, {
      ...state,
      setup: {
        onboarded: true,
        wakeTime: input.wakeTime,
        bedtime: input.bedtime,
        numberOfMeals: input.numberOfMeals,
        numberOfSnacks: input.numberOfSnacks,
        goals,
      },
      scheduleSlots,
    });
  });
}

/**
 * Regenerates suggested times for every slot the user has NOT manually
 * edited (timeEdited: false); manually edited slots are left untouched
 * unless `force` is true (explicit user confirmation to overwrite everything).
 */
export async function recalculateSchedule(
  token: string,
  wakeTime: string,
  bedtime: string,
  force: boolean
): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    if (!isValidTime(wakeTime) || !isValidTime(bedtime)) throw new Error("Invalid time.");
    const state = await getMealPlannerState(token);
    const suggested = generateSuggestedSchedule(
      wakeTime,
      bedtime,
      state.setup.numberOfMeals,
      state.setup.numberOfSnacks
    );

    const editedSlots = state.scheduleSlots.filter((s) => s.timeEdited && !force);
    const regenerated: ScheduleSlot[] = suggested.map((s, i) => ({
      id: state.scheduleSlots[i]?.id ?? randomUUID(),
      label: s.label,
      time: s.time,
      timeEdited: false,
      custom: false,
    }));

    // Re-apply manually edited slots by label, preserving their chosen time.
    const merged = regenerated.map((slot) => {
      const preserved = editedSlots.find((e) => e.label === slot.label);
      return preserved ? { ...slot, time: preserved.time, timeEdited: true } : slot;
    });

    return save(token, {
      ...state,
      setup: { ...state.setup, wakeTime, bedtime },
      scheduleSlots: merged,
    });
  });
}

// ---------- Schedule slots ----------

export async function updateSlotTime(token: string, slotId: string, time: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    if (!isValidTime(time)) throw new Error("Invalid time.");
    const state = await getMealPlannerState(token);
    const scheduleSlots = state.scheduleSlots.map((s) => (s.id === slotId ? { ...s, time, timeEdited: true } : s));
    return save(token, { ...state, scheduleSlots });
  });
}

export async function addScheduleSlot(token: string, label: string, time: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const trimmed = label.trim().slice(0, MAX_LABEL_LENGTH);
    if (!trimmed) throw new Error("Label required.");
    if (!isValidTime(time)) throw new Error("Invalid time.");
    const state = await getMealPlannerState(token);
    if (state.scheduleSlots.length >= MAX_SCHEDULE_SLOTS) throw new Error("Too many meal times.");
    const slot: ScheduleSlot = { id: randomUUID(), label: trimmed, time, timeEdited: true, custom: true };
    return save(token, { ...state, scheduleSlots: [...state.scheduleSlots, slot] });
  });
}

export async function deleteScheduleSlot(token: string, slotId: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const state = await getMealPlannerState(token);
    return save(token, { ...state, scheduleSlots: state.scheduleSlots.filter((s) => s.id !== slotId) });
  });
}

// ---------- Meals (per date, per slot) ----------

export async function setMealName(token: string, date: string, slotId: string, mealName: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const state = await getMealPlannerState(token);
    if (!state.scheduleSlots.some((s) => s.id === slotId)) throw new Error("Unknown meal slot.");
    const trimmed = mealName.trim().slice(0, MAX_LABEL_LENGTH);
    const day = { ...(state.mealsByDate[date] ?? {}) };
    day[slotId] = { mealName: trimmed, status: day[slotId]?.status ?? "planned" };
    return save(token, trimTrackedDays({ ...state, mealsByDate: { ...state.mealsByDate, [date]: day } }));
  });
}

export async function toggleMealStatus(token: string, date: string, slotId: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const state = await getMealPlannerState(token);
    if (!state.scheduleSlots.some((s) => s.id === slotId)) throw new Error("Unknown meal slot.");
    const day = { ...(state.mealsByDate[date] ?? {}) };
    const current = day[slotId] ?? { mealName: "", status: "planned" as const };
    day[slotId] = { ...current, status: current.status === "completed" ? "planned" : "completed" };
    return save(token, trimTrackedDays({ ...state, mealsByDate: { ...state.mealsByDate, [date]: day } }));
  });
}

// ---------- Meal templates ----------

export async function addMealTemplate(token: string, name: string, note: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const trimmedName = name.trim().slice(0, MAX_LABEL_LENGTH);
    if (!trimmedName) throw new Error("Name required.");
    const state = await getMealPlannerState(token);
    if (state.mealTemplates.length >= MAX_TEMPLATES) throw new Error("Too many saved meals.");
    const template = { id: randomUUID(), name: trimmedName, note: note.trim().slice(0, MAX_NOTE_LENGTH) };
    return save(token, { ...state, mealTemplates: [...state.mealTemplates, template] });
  });
}

export async function deleteMealTemplate(token: string, id: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const state = await getMealPlannerState(token);
    return save(token, { ...state, mealTemplates: state.mealTemplates.filter((t) => t.id !== id) });
  });
}

// ---------- Grocery list / Prep list (shared implementation) ----------

type ListKind = "groceryList" | "prepList";

export async function addListItem(token: string, list: ListKind, label: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const trimmed = label.trim().slice(0, MAX_LABEL_LENGTH);
    if (!trimmed) throw new Error("Item text required.");
    const state = await getMealPlannerState(token);
    if (state[list].length >= MAX_CHECKLIST_ITEMS) throw new Error("Too many items.");
    const item = { id: randomUUID(), label: trimmed, done: false };
    return save(token, { ...state, [list]: [...state[list], item] });
  });
}

export async function toggleListItem(token: string, list: ListKind, id: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const state = await getMealPlannerState(token);
    return save(token, {
      ...state,
      [list]: state[list].map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
    });
  });
}

export async function deleteListItem(token: string, list: ListKind, id: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const state = await getMealPlannerState(token);
    return save(token, { ...state, [list]: state[list].filter((i) => i.id !== id) });
  });
}

export async function clearCompletedListItems(token: string, list: ListKind): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const state = await getMealPlannerState(token);
    return save(token, { ...state, [list]: state[list].filter((i) => !i.done) });
  });
}

// ---------- Check-ins ----------

export async function saveCheckIn(token: string, date: string, note: string): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    const state = await getMealPlannerState(token);
    const trimmed = note.trim().slice(0, MAX_NOTE_LENGTH);
    const checkIns = { ...state.checkIns };
    if (trimmed) {
      checkIns[date] = { note: trimmed, updatedAt: new Date().toISOString() };
    } else {
      delete checkIns[date];
    }
    return save(token, { ...state, checkIns });
  });
}

// ---------- Reminder preferences (stored only — no real notifications) ----------

export async function saveReminderPrefs(
  token: string,
  enabled: boolean,
  remindMinutesBefore: number
): Promise<MealPlannerState> {
  return withLock(lockKey(token), async () => {
    if (
      typeof enabled !== "boolean" ||
      !Number.isFinite(remindMinutesBefore) ||
      remindMinutesBefore < 0 ||
      remindMinutesBefore > MAX_REMINDER_MINUTES
    ) {
      throw new Error("Invalid reminder preferences.");
    }
    const state = await getMealPlannerState(token);
    return save(token, { ...state, reminderPrefs: { enabled, remindMinutesBefore } });
  });
}
