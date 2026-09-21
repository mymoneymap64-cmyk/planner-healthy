import { randomUUID } from "crypto";
import { getKv, withLock } from "@/lib/kv";
import {
  WellnessDashboardState,
  DailyPlanSection,
  emptyDashboardState,
  todayISO,
} from "@/lib/wellnessDashboard";

const MAX_LABEL_LENGTH = 120;
const MAX_TITLE_LENGTH = 80;
const MAX_NOTE_LENGTH = 5000;
const MAX_TASKS_PER_SECTION = 20;
const MAX_CHECKLISTS = 30;
const MAX_CHECKLIST_ITEMS = 40;
const MAX_JOURNAL_ENTRIES = 500;
const MAX_ACTIVITY_DAYS = 120;

function key(token: string): string {
  return `wellness-dashboard:${token}`;
}

function lockKey(token: string): string {
  return `lock:wellness-dashboard:${token}`;
}

export async function getDashboardState(token: string): Promise<WellnessDashboardState> {
  const stored = await getKv().get<WellnessDashboardState>(key(token));
  return stored ?? emptyDashboardState();
}

async function save(token: string, state: WellnessDashboardState): Promise<WellnessDashboardState> {
  const next = { ...state, updatedAt: new Date().toISOString() };
  await getKv().set(key(token), next);
  return next;
}

function trimActivity(state: WellnessDashboardState): WellnessDashboardState {
  const dates = Object.keys(state.activity).sort();
  if (dates.length <= MAX_ACTIVITY_DAYS) return state;
  const toDrop = dates.slice(0, dates.length - MAX_ACTIVITY_DAYS);
  const activity = { ...state.activity };
  for (const d of toDrop) delete activity[d];
  return { ...state, activity };
}

// Every mutation below runs its get -> mutate -> set cycle inside
// withLock(), so two concurrent requests for the same token can no longer
// race and silently drop one another's update.

// ---------- Today's Focus / Daily Plan (date-scoped completion) ----------

export async function toggleTaskToday(token: string, taskId: string): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const allIds = [
      ...state.todaysFocus.map((t) => t.id),
      ...state.dailyPlan.morning.map((t) => t.id),
      ...state.dailyPlan.afternoon.map((t) => t.id),
      ...state.dailyPlan.evening.map((t) => t.id),
    ];
    if (!allIds.includes(taskId)) throw new Error("Unknown task.");

    const today = todayISO();
    const current = state.activity[today] ?? [];
    const nextForToday = current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId];

    return save(token, trimActivity({ ...state, activity: { ...state.activity, [today]: nextForToday } }));
  });
}

export async function addDailyPlanTask(
  token: string,
  section: DailyPlanSection,
  label: string
): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const trimmed = label.trim().slice(0, MAX_LABEL_LENGTH);
    if (!trimmed) throw new Error("Task label required.");
    if (state.dailyPlan[section].length >= MAX_TASKS_PER_SECTION) throw new Error("Too many tasks.");

    const nextSection = [...state.dailyPlan[section], { id: randomUUID(), label: trimmed, custom: true }];
    return save(token, { ...state, dailyPlan: { ...state.dailyPlan, [section]: nextSection } });
  });
}

export async function deleteDailyPlanTask(
  token: string,
  section: DailyPlanSection,
  taskId: string
): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const nextSection = state.dailyPlan[section].filter((t) => t.id !== taskId);
    return save(token, { ...state, dailyPlan: { ...state.dailyPlan, [section]: nextSection } });
  });
}

export async function reorderDailyPlanTask(
  token: string,
  section: DailyPlanSection,
  taskId: string,
  direction: "up" | "down"
): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const list = [...state.dailyPlan[section]];
    const index = list.findIndex((t) => t.id === taskId);
    if (index === -1) throw new Error("Unknown task.");
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= list.length) return state;
    [list[index], list[swapWith]] = [list[swapWith], list[index]];
    return save(token, { ...state, dailyPlan: { ...state.dailyPlan, [section]: list } });
  });
}

// ---------- Checklists ----------

export async function toggleChecklistItem(
  token: string,
  checklistId: string,
  itemId: string
): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const checklists = state.checklists.map((c) =>
      c.id !== checklistId
        ? c
        : { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i)) }
    );
    return save(token, { ...state, checklists });
  });
}

export async function resetChecklist(token: string, checklistId: string): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const checklists = state.checklists.map((c) =>
      c.id !== checklistId ? c : { ...c, items: c.items.map((i) => ({ ...i, done: false })) }
    );
    return save(token, { ...state, checklists });
  });
}

export async function createChecklist(
  token: string,
  title: string,
  itemLabels: string[]
): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    if (state.checklists.length >= MAX_CHECKLISTS) throw new Error("Too many checklists.");
    const trimmedTitle = title.trim().slice(0, MAX_TITLE_LENGTH);
    if (!trimmedTitle) throw new Error("Checklist title required.");

    const items = itemLabels
      .map((l) => l.trim().slice(0, MAX_LABEL_LENGTH))
      .filter(Boolean)
      .slice(0, MAX_CHECKLIST_ITEMS)
      .map((label) => ({ id: randomUUID(), label, done: false }));

    const checklist = { id: randomUUID(), title: trimmedTitle, items, custom: true };
    return save(token, { ...state, checklists: [...state.checklists, checklist] });
  });
}

export async function deleteChecklist(token: string, checklistId: string): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const target = state.checklists.find((c) => c.id === checklistId);
    if (!target || !target.custom) throw new Error("Only custom checklists can be deleted.");
    return save(token, { ...state, checklists: state.checklists.filter((c) => c.id !== checklistId) });
  });
}

// ---------- Journal ----------

export async function addJournalEntry(
  token: string,
  body: string,
  prompt: string | null
): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    if (state.journal.length >= MAX_JOURNAL_ENTRIES) throw new Error("Too many journal entries.");
    const trimmed = body.trim().slice(0, MAX_NOTE_LENGTH);
    if (!trimmed) throw new Error("Note body required.");

    const now = new Date().toISOString();
    const entry = { id: randomUUID(), body: trimmed, prompt, createdAt: now, updatedAt: now };
    return save(token, { ...state, journal: [entry, ...state.journal] });
  });
}

export async function updateJournalEntry(token: string, id: string, body: string): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const trimmed = body.trim().slice(0, MAX_NOTE_LENGTH);
    if (!trimmed) throw new Error("Note body required.");
    const journal = state.journal.map((n) => (n.id === id ? { ...n, body: trimmed, updatedAt: new Date().toISOString() } : n));
    return save(token, { ...state, journal });
  });
}

export async function deleteJournalEntry(token: string, id: string): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    return save(token, {
      ...state,
      journal: state.journal.filter((n) => n.id !== id),
      favorites: { ...state.favorites, notes: state.favorites.notes.filter((nid) => nid !== id) },
    });
  });
}

// ---------- Favorites ----------

export async function toggleFavorite(
  token: string,
  kind: "guides" | "checklists" | "notes",
  id: string
): Promise<WellnessDashboardState> {
  return withLock(lockKey(token), async () => {
    const state = await getDashboardState(token);
    const current = state.favorites[kind];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    return save(token, { ...state, favorites: { ...state.favorites, [kind]: next } });
  });
}
