import { NextRequest, NextResponse } from "next/server";
import { getOrderByToken } from "@/lib/orders";
import { isEntitled } from "@/lib/readerAuth";
import {
  getReaderProgress,
  saveEbookPage,
  savePlannerPage,
  toggleBookmark,
  toggleDayComplete,
  saveDayNote,
} from "@/lib/readerProgress";

export const runtime = "nodejs";

async function requireEntitlement(token: string, slug: string) {
  const order = await getOrderByToken(token).catch(() => null);
  if (!order || !isEntitled(order, slug)) return null;
  return order;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string; slug: string }> }
) {
  const { token, slug } = await params;
  const order = await requireEntitlement(token, slug);
  if (!order) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const progress = await getReaderProgress(token, slug);
    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Failed to load reader progress:", error);
    return NextResponse.json({ error: "Could not load progress." }, { status: 500 });
  }
}

type ProgressAction =
  | { type: "ebookPage"; page: number }
  | { type: "plannerPage"; page: number }
  | { type: "bookmark"; page: number }
  | { type: "completeDay"; day: number }
  | { type: "dayNote"; day: number; note: string };

const MAX_NOTE_LENGTH = 5000;
// Generous upper bound — real PDFs here top out around 30 pages, this just
// guards against nonsense/abusive values, not exact per-product page counts.
const MAX_PAGE = 2000;

function isValidPage(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= MAX_PAGE;
}

function isValidDay(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 30;
}

function isValidNote(value: unknown): value is string {
  return typeof value === "string" && value.length <= MAX_NOTE_LENGTH;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string; slug: string }> }
) {
  const { token, slug } = await params;
  const order = await requireEntitlement(token, slug);
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

  const typedAction = action as ProgressAction;

  try {
    let progress;
    switch (typedAction.type) {
      case "ebookPage":
        if (!isValidPage(typedAction.page)) {
          return NextResponse.json({ error: "Invalid page." }, { status: 400 });
        }
        progress = await saveEbookPage(token, slug, typedAction.page);
        break;
      case "plannerPage":
        if (!isValidPage(typedAction.page)) {
          return NextResponse.json({ error: "Invalid page." }, { status: 400 });
        }
        progress = await savePlannerPage(token, slug, typedAction.page);
        break;
      case "bookmark":
        if (!isValidPage(typedAction.page)) {
          return NextResponse.json({ error: "Invalid page." }, { status: 400 });
        }
        progress = await toggleBookmark(token, slug, typedAction.page);
        break;
      case "completeDay":
        if (!isValidDay(typedAction.day)) {
          return NextResponse.json({ error: "Invalid day." }, { status: 400 });
        }
        progress = await toggleDayComplete(token, slug, typedAction.day);
        break;
      case "dayNote":
        if (!isValidDay(typedAction.day) || !isValidNote(typedAction.note)) {
          return NextResponse.json({ error: "Invalid day or note." }, { status: 400 });
        }
        progress = await saveDayNote(token, slug, typedAction.day, typedAction.note);
        break;
      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }
    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Failed to save reader progress:", error);
    return NextResponse.json({ error: "Could not save progress." }, { status: 500 });
  }
}
