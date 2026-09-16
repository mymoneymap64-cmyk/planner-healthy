import { getKv } from "@/lib/kv";

export type ReaderProgress = {
  token: string;
  slug: string;
  /** Last PDF page the customer viewed, 1-indexed. */
  ebookPage: number;
  ebookBookmarks: number[];
  plannerPage: number;
  /** Day numbers (1-30) the customer has marked complete. */
  completedDays: number[];
  dayNotes: Record<number, string>;
  updatedAt: string;
};

function key(token: string, slug: string): string {
  return `reader:${token}:${slug}`;
}

function emptyProgress(token: string, slug: string): ReaderProgress {
  return {
    token,
    slug,
    ebookPage: 1,
    ebookBookmarks: [],
    plannerPage: 1,
    completedDays: [],
    dayNotes: {},
    updatedAt: new Date().toISOString(),
  };
}

export async function getReaderProgress(token: string, slug: string): Promise<ReaderProgress> {
  const stored = await getKv().get<ReaderProgress>(key(token, slug));
  return stored ?? emptyProgress(token, slug);
}

async function save(token: string, slug: string, patch: Partial<ReaderProgress>): Promise<ReaderProgress> {
  const current = await getReaderProgress(token, slug);
  const next: ReaderProgress = { ...current, ...patch, updatedAt: new Date().toISOString() };
  await getKv().set(key(token, slug), next);
  return next;
}

export async function saveEbookPage(token: string, slug: string, page: number): Promise<ReaderProgress> {
  return save(token, slug, { ebookPage: page });
}

export async function savePlannerPage(token: string, slug: string, page: number): Promise<ReaderProgress> {
  return save(token, slug, { plannerPage: page });
}

export async function toggleBookmark(token: string, slug: string, page: number): Promise<ReaderProgress> {
  const current = await getReaderProgress(token, slug);
  const bookmarks = current.ebookBookmarks.includes(page)
    ? current.ebookBookmarks.filter((p) => p !== page)
    : [...current.ebookBookmarks, page].sort((a, b) => a - b);
  return save(token, slug, { ebookBookmarks: bookmarks });
}

export async function toggleDayComplete(token: string, slug: string, day: number): Promise<ReaderProgress> {
  const current = await getReaderProgress(token, slug);
  const completedDays = current.completedDays.includes(day)
    ? current.completedDays.filter((d) => d !== day)
    : [...current.completedDays, day].sort((a, b) => a - b);
  return save(token, slug, { completedDays });
}

export async function saveDayNote(token: string, slug: string, day: number, note: string): Promise<ReaderProgress> {
  const current = await getReaderProgress(token, slug);
  return save(token, slug, { dayNotes: { ...current.dayNotes, [day]: note } });
}
