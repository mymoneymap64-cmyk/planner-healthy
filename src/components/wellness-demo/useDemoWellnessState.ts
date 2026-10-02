"use client";

import { useMemo, useState } from "react";
import {
  WellnessDashboardState,
  DailyPlanSection,
  DEFAULT_TODAYS_FOCUS,
  DEFAULT_DAILY_PLAN,
  DEFAULT_CHECKLISTS,
  computeStats,
  todayISO as dashboardToday,
} from "@/lib/wellnessDashboard";
import {
  MealPlannerState,
  ScheduleSlot,
  generateSuggestedSchedule,
  computeMealPlannerStats,
  todayISO,
  weekDatesFor,
} from "@/lib/mealPlanner";

/**
 * Entirely local, in-memory demo state — never fetched from or written to
 * any server, Redis, or storage. Seeded once on mount and reset on page
 * refresh. There is no token, no order, and no network call anywhere in
 * this module; every mutation below is a plain setState.
 */

function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

function seedDashboardState(): WellnessDashboardState {
  const today = dashboardToday();
  const checklists = DEFAULT_CHECKLISTS.map((c, i) => ({
    ...c,
    custom: false,
    items: c.items.map((item, j) => ({ ...item, done: i === 0 && j < 2 })),
  }));

  // A believable 6-day streak leading up to today, so Progress looks real.
  const activity: WellnessDashboardState["activity"] = {};
  for (let i = 1; i <= 6; i++) {
    activity[isoDaysAgo(i)] = ["focus-read", "focus-checklist"];
  }
  activity[today] = ["focus-read"];

  return {
    todaysFocus: DEFAULT_TODAYS_FOCUS,
    dailyPlan: DEFAULT_DAILY_PLAN,
    checklists,
    journal: [
      {
        id: "demo-note-1",
        body: "Felt calmer after the evening wind-down routine — worth repeating this week.",
        prompt: "How am I feeling today?",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    favorites: { guides: [], checklists: [DEFAULT_CHECKLISTS[0].id], notes: ["demo-note-1"] },
    activity,
    updatedAt: new Date().toISOString(),
  };
}

function seedMealPlannerState(): MealPlannerState {
  const suggested = generateSuggestedSchedule("07:00", "22:30", 3, 1);
  const scheduleSlots: ScheduleSlot[] = suggested.map((s, i) => ({
    id: `demo-slot-${i}`,
    label: s.label,
    time: s.time,
    timeEdited: false,
    custom: false,
  }));

  const breakfast = scheduleSlots[0];
  const today = todayISO();

  return {
    setup: { onboarded: true, wakeTime: "07:00", bedtime: "22:30", numberOfMeals: 3, numberOfSnacks: 1, goals: ["eat-regularly", "plan-ahead"] },
    scheduleSlots,
    mealsByDate: {
      [today]: breakfast ? { [breakfast.id]: { mealName: "Oatmeal + berries", status: "completed" } } : {},
    },
    mealTemplates: [
      { id: "demo-template-1", name: "Greek yogurt + berries", note: "5 min" },
      { id: "demo-template-2", name: "Grilled chicken + veggies", note: "" },
    ],
    groceryList: [
      { id: "demo-g1", label: "Spinach", done: false },
      { id: "demo-g2", label: "Greek yogurt", done: false },
      { id: "demo-g3", label: "Eggs", done: true },
    ],
    prepList: [
      { id: "demo-p1", label: "Chop vegetables for tomorrow", done: false },
      { id: "demo-p2", label: "Marinate chicken", done: true },
    ],
    checkIns: {},
    reminderPrefs: { enabled: false, remindMinutesBefore: 15 },
    updatedAt: new Date().toISOString(),
  };
}

export function useDemoWellnessState() {
  const [dashboard, setDashboard] = useState<WellnessDashboardState>(seedDashboardState);
  const [meals, setMeals] = useState<MealPlannerState>(seedMealPlannerState);

  const dashboardStats = useMemo(() => computeStats(dashboard), [dashboard]);
  const mealStats = useMemo(() => computeMealPlannerStats(meals), [meals]);
  const week = useMemo(() => weekDatesFor(todayISO()), []);

  // ---------- Dashboard actions (all local) ----------

  function toggleTaskToday(taskId: string) {
    setDashboard((state) => {
      const today = dashboardToday();
      const current = state.activity[today] ?? [];
      const next = current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId];
      return { ...state, activity: { ...state.activity, [today]: next } };
    });
  }

  function addDailyPlanTask(section: DailyPlanSection, label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    setDashboard((state) => ({
      ...state,
      dailyPlan: {
        ...state.dailyPlan,
        [section]: [...state.dailyPlan[section], { id: `demo-${Date.now()}`, label: trimmed, custom: true }],
      },
    }));
  }

  function deleteDailyPlanTask(section: DailyPlanSection, taskId: string) {
    setDashboard((state) => ({
      ...state,
      dailyPlan: { ...state.dailyPlan, [section]: state.dailyPlan[section].filter((t) => t.id !== taskId) },
    }));
  }

  function toggleChecklistItem(checklistId: string, itemId: string) {
    setDashboard((state) => ({
      ...state,
      checklists: state.checklists.map((c) =>
        c.id !== checklistId ? c : { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i)) }
      ),
    }));
  }

  function toggleFavorite(kind: "guides" | "checklists" | "notes", id: string) {
    setDashboard((state) => {
      const current = state.favorites[kind];
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      return { ...state, favorites: { ...state.favorites, [kind]: next } };
    });
  }

  function addNote(body: string) {
    const trimmed = body.trim();
    if (!trimmed) return;
    setDashboard((state) => ({
      ...state,
      journal: [
        { id: `demo-note-${Date.now()}`, body: trimmed, prompt: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        ...state.journal,
      ],
    }));
  }

  function deleteNote(id: string) {
    setDashboard((state) => ({
      ...state,
      journal: state.journal.filter((n) => n.id !== id),
      favorites: { ...state.favorites, notes: state.favorites.notes.filter((n) => n !== id) },
    }));
  }

  // ---------- Meal planner actions (all local) ----------

  function setMealName(date: string, slotId: string, mealName: string) {
    setMeals((state) => {
      const day = { ...(state.mealsByDate[date] ?? {}) };
      day[slotId] = { mealName: mealName.trim(), status: day[slotId]?.status ?? "planned" };
      return { ...state, mealsByDate: { ...state.mealsByDate, [date]: day } };
    });
  }

  function toggleMealStatus(date: string, slotId: string) {
    setMeals((state) => {
      const day = { ...(state.mealsByDate[date] ?? {}) };
      const current = day[slotId] ?? { mealName: "", status: "planned" as const };
      day[slotId] = { ...current, status: current.status === "completed" ? "planned" : "completed" };
      return { ...state, mealsByDate: { ...state.mealsByDate, [date]: day } };
    });
  }

  function updateSlotTime(slotId: string, time: string) {
    setMeals((state) => ({
      ...state,
      scheduleSlots: state.scheduleSlots.map((s) => (s.id === slotId ? { ...s, time, timeEdited: true } : s)),
    }));
  }

  function toggleListItem(list: "groceryList" | "prepList", id: string) {
    setMeals((state) => ({ ...state, [list]: state[list].map((i) => (i.id === id ? { ...i, done: !i.done } : i)) }));
  }

  function addListItem(list: "groceryList" | "prepList", label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    setMeals((state) => ({ ...state, [list]: [...state[list], { id: `demo-${Date.now()}`, label: trimmed, done: false }] }));
  }

  function deleteListItem(list: "groceryList" | "prepList", id: string) {
    setMeals((state) => ({ ...state, [list]: state[list].filter((i) => i.id !== id) }));
  }

  return {
    dashboard,
    dashboardStats,
    meals,
    mealStats,
    week,
    toggleTaskToday,
    addDailyPlanTask,
    deleteDailyPlanTask,
    toggleChecklistItem,
    toggleFavorite,
    addNote,
    deleteNote,
    setMealName,
    toggleMealStatus,
    updateSlotTime,
    toggleListItem,
    addListItem,
    deleteListItem,
  };
}

export type DemoWellnessState = ReturnType<typeof useDemoWellnessState>;
