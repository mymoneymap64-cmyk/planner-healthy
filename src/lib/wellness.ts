import { randomUUID } from "crypto";
import { getKv, withLock } from "@/lib/kv";
import { getChecklistItemIds } from "@/data/wellnessTools";

export type ChecklistState = Record<string, boolean>;

export type WellnessNote = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export const MAX_NOTE_BODY_LENGTH = 5000;
export const MAX_NOTES_PER_PRODUCT = 200;

function checklistKey(token: string, slug: string): string {
  return `wellness:${token}:${slug}:checklist`;
}

function notesKey(token: string, slug: string): string {
  return `wellness:${token}:${slug}:notes`;
}

export async function getChecklistState(token: string, slug: string): Promise<ChecklistState> {
  const state = await getKv().get<ChecklistState>(checklistKey(token, slug));
  return state ?? {};
}

/**
 * Toggles one checklist item. `itemId` must be one of that product's
 * configured item ids (validated against `wellnessTools.ts`) — an unknown
 * id is rejected rather than silently written, so the stored record can
 * never accumulate arbitrary client-supplied keys.
 */
export async function toggleChecklistItem(token: string, slug: string, itemId: string): Promise<ChecklistState> {
  const validIds = getChecklistItemIds(slug);
  if (!validIds.includes(itemId)) {
    throw new Error("Unknown checklist item.");
  }

  return withLock(`lock:${checklistKey(token, slug)}`, async () => {
    const kv = getKv();
    const current = await getChecklistState(token, slug);
    const next: ChecklistState = { ...current, [itemId]: !current[itemId] };
    await kv.set(checklistKey(token, slug), next);
    return next;
  });
}

export async function getNotes(token: string, slug: string): Promise<WellnessNote[]> {
  const notes = await getKv().get<WellnessNote[]>(notesKey(token, slug));
  return notes ?? [];
}

export async function addNote(token: string, slug: string, body: string): Promise<WellnessNote[]> {
  return withLock(`lock:${notesKey(token, slug)}`, async () => {
    const kv = getKv();
    const current = await getNotes(token, slug);
    if (current.length >= MAX_NOTES_PER_PRODUCT) {
      throw new Error("Note limit reached.");
    }

    const now = new Date().toISOString();
    const note: WellnessNote = { id: randomUUID(), body, createdAt: now, updatedAt: now };
    const next = [note, ...current];
    await kv.set(notesKey(token, slug), next);
    return next;
  });
}

export async function updateNote(token: string, slug: string, noteId: string, body: string): Promise<WellnessNote[]> {
  return withLock(`lock:${notesKey(token, slug)}`, async () => {
    const kv = getKv();
    const current = await getNotes(token, slug);
    const next = current.map((n) => (n.id === noteId ? { ...n, body, updatedAt: new Date().toISOString() } : n));
    await kv.set(notesKey(token, slug), next);
    return next;
  });
}

export async function deleteNote(token: string, slug: string, noteId: string): Promise<WellnessNote[]> {
  return withLock(`lock:${notesKey(token, slug)}`, async () => {
    const kv = getKv();
    const current = await getNotes(token, slug);
    const next = current.filter((n) => n.id !== noteId);
    await kv.set(notesKey(token, slug), next);
    return next;
  });
}
