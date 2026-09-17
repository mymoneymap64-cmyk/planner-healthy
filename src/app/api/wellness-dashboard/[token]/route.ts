import { NextRequest, NextResponse } from "next/server";
import { requireOrder } from "@/lib/readerAuth";
import { computeStats, DailyPlanSection, JOURNAL_PROMPTS } from "@/lib/wellnessDashboard";
import {
  getDashboardState,
  toggleTaskToday,
  addDailyPlanTask,
  deleteDailyPlanTask,
  reorderDailyPlanTask,
  toggleChecklistItem,
  resetChecklist,
  createChecklist,
  deleteChecklist,
  addJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  toggleFavorite,
} from "@/lib/wellnessDashboardStore";

export const runtime = "nodejs";

const SECTIONS: DailyPlanSection[] = ["morning", "afternoon", "evening"];
const FAVORITE_KINDS = ["guides", "checklists", "notes"] as const;

function isSection(value: unknown): value is DailyPlanSection {
  return typeof value === "string" && (SECTIONS as string[]).includes(value);
}

function isFavoriteKind(value: unknown): value is (typeof FAVORITE_KINDS)[number] {
  return typeof value === "string" && (FAVORITE_KINDS as readonly string[]).includes(value);
}

function isId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 200;
}

function isLabel(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= 5000;
}

async function requireToken(token: string) {
  const order = await requireOrder(token);
  return order;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireToken(token);
  if (!order) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const state = await getDashboardState(token);
    const stats = computeStats(state);
    return NextResponse.json({ state, stats, prompts: JOURNAL_PROMPTS });
  } catch (error) {
    console.error("Failed to load wellness dashboard state:", error);
    return NextResponse.json({ error: "Could not load data." }, { status: 500 });
  }
}

type Action =
  | { type: "toggleTaskToday"; taskId: string }
  | { type: "addDailyPlanTask"; section: DailyPlanSection; label: string }
  | { type: "deleteDailyPlanTask"; section: DailyPlanSection; taskId: string }
  | { type: "reorderDailyPlanTask"; section: DailyPlanSection; taskId: string; direction: "up" | "down" }
  | { type: "toggleChecklistItem"; checklistId: string; itemId: string }
  | { type: "resetChecklist"; checklistId: string }
  | { type: "createChecklist"; title: string; items: string[] }
  | { type: "deleteChecklist"; checklistId: string }
  | { type: "addJournalEntry"; body: string; prompt: string | null }
  | { type: "updateJournalEntry"; id: string; body: string }
  | { type: "deleteJournalEntry"; id: string }
  | { type: "toggleFavorite"; kind: "guides" | "checklists" | "notes"; id: string };

export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireToken(token);
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
      case "toggleTaskToday":
        if (!isId(a.taskId)) return badRequest();
        state = await toggleTaskToday(token, a.taskId);
        break;
      case "addDailyPlanTask":
        if (!isSection(a.section) || !isLabel(a.label)) return badRequest();
        state = await addDailyPlanTask(token, a.section, a.label);
        break;
      case "deleteDailyPlanTask":
        if (!isSection(a.section) || !isId(a.taskId)) return badRequest();
        state = await deleteDailyPlanTask(token, a.section, a.taskId);
        break;
      case "reorderDailyPlanTask":
        if (!isSection(a.section) || !isId(a.taskId) || (a.direction !== "up" && a.direction !== "down")) {
          return badRequest();
        }
        state = await reorderDailyPlanTask(token, a.section, a.taskId, a.direction);
        break;
      case "toggleChecklistItem":
        if (!isId(a.checklistId) || !isId(a.itemId)) return badRequest();
        state = await toggleChecklistItem(token, a.checklistId, a.itemId);
        break;
      case "resetChecklist":
        if (!isId(a.checklistId)) return badRequest();
        state = await resetChecklist(token, a.checklistId);
        break;
      case "createChecklist":
        if (!isLabel(a.title) || !Array.isArray(a.items) || !a.items.every((i) => typeof i === "string")) {
          return badRequest();
        }
        state = await createChecklist(token, a.title, a.items);
        break;
      case "deleteChecklist":
        if (!isId(a.checklistId)) return badRequest();
        state = await deleteChecklist(token, a.checklistId);
        break;
      case "addJournalEntry":
        if (!isLabel(a.body) || (a.prompt !== null && typeof a.prompt !== "string")) return badRequest();
        state = await addJournalEntry(token, a.body, a.prompt ?? null);
        break;
      case "updateJournalEntry":
        if (!isId(a.id) || !isLabel(a.body)) return badRequest();
        state = await updateJournalEntry(token, a.id, a.body);
        break;
      case "deleteJournalEntry":
        if (!isId(a.id)) return badRequest();
        state = await deleteJournalEntry(token, a.id);
        break;
      case "toggleFavorite":
        if (!isFavoriteKind(a.kind) || !isId(a.id)) return badRequest();
        state = await toggleFavorite(token, a.kind, a.id);
        break;
      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    return NextResponse.json({ state, stats: computeStats(state) });
  } catch (error) {
    console.error("Failed to update wellness dashboard state:", error);
    const message = error instanceof Error ? error.message : "Could not save data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function badRequest() {
  return NextResponse.json({ error: "Invalid action payload." }, { status: 400 });
}
