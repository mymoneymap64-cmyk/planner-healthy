import { NextRequest, NextResponse } from "next/server";
import { requireOrder } from "@/lib/readerAuth";
import { computeMealPlannerStats } from "@/lib/mealPlanner";
import {
  getMealPlannerState,
  saveSetup,
  recalculateSchedule,
  updateSlotTime,
  addScheduleSlot,
  deleteScheduleSlot,
  setMealName,
  toggleMealStatus,
  addMealTemplate,
  deleteMealTemplate,
  addListItem,
  toggleListItem,
  deleteListItem,
  clearCompletedListItems,
  saveCheckIn,
  saveReminderPrefs,
} from "@/lib/mealPlannerStore";

export const runtime = "nodejs";

function isId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 200;
}

function isLabel(value: unknown): value is string {
  return typeof value === "string" && value.length <= 5000;
}

function isDateISO(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isListKind(value: unknown): value is "groceryList" | "prepList" {
  return value === "groceryList" || value === "prepList";
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const state = await getMealPlannerState(token);
    const stats = computeMealPlannerStats(state);
    return NextResponse.json({ state, stats });
  } catch (error) {
    console.error("Failed to load meal planner state:", error);
    return NextResponse.json({ error: "Could not load data." }, { status: 500 });
  }
}

type Action =
  | {
      type: "saveSetup";
      wakeTime: string;
      bedtime: string;
      numberOfMeals: 2 | 3 | 4;
      numberOfSnacks: 0 | 1 | 2;
      goals: string[];
      slots?: { label: string; time: string }[];
    }
  | { type: "recalculateSchedule"; wakeTime: string; bedtime: string; force: boolean }
  | { type: "updateSlotTime"; slotId: string; time: string }
  | { type: "addScheduleSlot"; label: string; time: string }
  | { type: "deleteScheduleSlot"; slotId: string }
  | { type: "setMealName"; date: string; slotId: string; mealName: string }
  | { type: "toggleMealStatus"; date: string; slotId: string }
  | { type: "addMealTemplate"; name: string; note: string }
  | { type: "deleteMealTemplate"; id: string }
  | { type: "addListItem"; list: "groceryList" | "prepList"; label: string }
  | { type: "toggleListItem"; list: "groceryList" | "prepList"; id: string }
  | { type: "deleteListItem"; list: "groceryList" | "prepList"; id: string }
  | { type: "clearCompletedListItems"; list: "groceryList" | "prepList" }
  | { type: "saveCheckIn"; date: string; note: string }
  | { type: "saveReminderPrefs"; enabled: boolean; remindMinutesBefore: number };

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  let action: unknown;
  try {
    action = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!action || typeof action !== "object" || typeof (action as { type?: unknown }).type !== "string") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const a = action as Action;

  try {
    let state;
    switch (a.type) {
      case "saveSetup":
        if (
          !isLabel(a.wakeTime) ||
          !isLabel(a.bedtime) ||
          ![2, 3, 4].includes(a.numberOfMeals) ||
          ![0, 1, 2].includes(a.numberOfSnacks) ||
          !Array.isArray(a.goals)
        ) {
          return badRequest();
        }
        state = await saveSetup(token, {
          wakeTime: a.wakeTime,
          bedtime: a.bedtime,
          numberOfMeals: a.numberOfMeals,
          numberOfSnacks: a.numberOfSnacks,
          goals: a.goals.filter((g): g is string => typeof g === "string"),
          slots: Array.isArray(a.slots)
            ? a.slots.filter(
                (s): s is { label: string; time: string } =>
                  !!s && typeof s.label === "string" && typeof s.time === "string"
              )
            : undefined,
        });
        break;
      case "recalculateSchedule":
        if (!isLabel(a.wakeTime) || !isLabel(a.bedtime) || typeof a.force !== "boolean") return badRequest();
        state = await recalculateSchedule(token, a.wakeTime, a.bedtime, a.force);
        break;
      case "updateSlotTime":
        if (!isId(a.slotId) || !isLabel(a.time)) return badRequest();
        state = await updateSlotTime(token, a.slotId, a.time);
        break;
      case "addScheduleSlot":
        if (!isLabel(a.label) || !isLabel(a.time)) return badRequest();
        state = await addScheduleSlot(token, a.label, a.time);
        break;
      case "deleteScheduleSlot":
        if (!isId(a.slotId)) return badRequest();
        state = await deleteScheduleSlot(token, a.slotId);
        break;
      case "setMealName":
        if (!isDateISO(a.date) || !isId(a.slotId) || !isLabel(a.mealName)) return badRequest();
        state = await setMealName(token, a.date, a.slotId, a.mealName);
        break;
      case "toggleMealStatus":
        if (!isDateISO(a.date) || !isId(a.slotId)) return badRequest();
        state = await toggleMealStatus(token, a.date, a.slotId);
        break;
      case "addMealTemplate":
        if (!isLabel(a.name) || !isLabel(a.note)) return badRequest();
        state = await addMealTemplate(token, a.name, a.note);
        break;
      case "deleteMealTemplate":
        if (!isId(a.id)) return badRequest();
        state = await deleteMealTemplate(token, a.id);
        break;
      case "addListItem":
        if (!isListKind(a.list) || !isLabel(a.label)) return badRequest();
        state = await addListItem(token, a.list, a.label);
        break;
      case "toggleListItem":
        if (!isListKind(a.list) || !isId(a.id)) return badRequest();
        state = await toggleListItem(token, a.list, a.id);
        break;
      case "deleteListItem":
        if (!isListKind(a.list) || !isId(a.id)) return badRequest();
        state = await deleteListItem(token, a.list, a.id);
        break;
      case "clearCompletedListItems":
        if (!isListKind(a.list)) return badRequest();
        state = await clearCompletedListItems(token, a.list);
        break;
      case "saveCheckIn":
        if (!isDateISO(a.date) || !isLabel(a.note)) return badRequest();
        state = await saveCheckIn(token, a.date, a.note);
        break;
      case "saveReminderPrefs":
        if (typeof a.enabled !== "boolean" || typeof a.remindMinutesBefore !== "number") return badRequest();
        state = await saveReminderPrefs(token, a.enabled, a.remindMinutesBefore);
        break;
      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    return NextResponse.json({ state, stats: computeMealPlannerStats(state) });
  } catch (error) {
    console.error("Failed to update meal planner state:", error);
    const message = error instanceof Error ? error.message : "Could not save data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function badRequest() {
  return NextResponse.json({ error: "Invalid action payload." }, { status: 400 });
}
