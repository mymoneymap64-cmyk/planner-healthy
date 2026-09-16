import { NextRequest, NextResponse } from "next/server";
import { requireEntitledProduct } from "@/lib/readerAuth";
import {
  getChecklistState,
  getNotes,
  toggleChecklistItem,
  addNote,
  updateNote,
  deleteNote,
  MAX_NOTE_BODY_LENGTH,
} from "@/lib/wellness";
import { getChecklistItemIds } from "@/data/wellnessTools";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string; slug: string }> }
) {
  const { token, slug } = await params;
  const result = await requireEntitledProduct(token, slug);
  if (!result) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const [checklist, notes] = await Promise.all([getChecklistState(token, slug), getNotes(token, slug)]);
    return NextResponse.json({ checklist, notes });
  } catch (error) {
    console.error("Failed to load wellness data:", error);
    return NextResponse.json({ error: "Could not load data." }, { status: 500 });
  }
}

type WellnessAction =
  | { type: "toggleChecklistItem"; itemId: string }
  | { type: "addNote"; body: string }
  | { type: "updateNote"; noteId: string; body: string }
  | { type: "deleteNote"; noteId: string };

function isValidItemId(value: unknown, slug: string): value is string {
  return typeof value === "string" && getChecklistItemIds(slug).includes(value);
}

function isValidNoteBody(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= MAX_NOTE_BODY_LENGTH;
}

function isValidNoteId(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 200;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string; slug: string }> }
) {
  const { token, slug } = await params;
  const result = await requireEntitledProduct(token, slug);
  if (!result) {
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

  const typedAction = action as WellnessAction;

  try {
    switch (typedAction.type) {
      case "toggleChecklistItem": {
        if (!isValidItemId(typedAction.itemId, slug)) {
          return NextResponse.json({ error: "Invalid checklist item." }, { status: 400 });
        }
        const checklist = await toggleChecklistItem(token, slug, typedAction.itemId);
        return NextResponse.json({ checklist });
      }
      case "addNote": {
        if (!isValidNoteBody(typedAction.body)) {
          return NextResponse.json({ error: "Invalid note." }, { status: 400 });
        }
        const notes = await addNote(token, slug, typedAction.body);
        return NextResponse.json({ notes });
      }
      case "updateNote": {
        if (!isValidNoteId(typedAction.noteId) || !isValidNoteBody(typedAction.body)) {
          return NextResponse.json({ error: "Invalid note." }, { status: 400 });
        }
        const notes = await updateNote(token, slug, typedAction.noteId, typedAction.body);
        return NextResponse.json({ notes });
      }
      case "deleteNote": {
        if (!isValidNoteId(typedAction.noteId)) {
          return NextResponse.json({ error: "Invalid note." }, { status: 400 });
        }
        const notes = await deleteNote(token, slug, typedAction.noteId);
        return NextResponse.json({ notes });
      }
      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }
  } catch (error) {
    console.error("Failed to save wellness data:", error);
    return NextResponse.json({ error: "Could not save data." }, { status: 500 });
  }
}
