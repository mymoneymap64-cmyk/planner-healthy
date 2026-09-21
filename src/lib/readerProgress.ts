import { getKv, withLock } from "@/lib/kv";

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

function lockKey(token: string, slug: string): string {
  return `lock:${key(token, slug)}`;
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

/**
 * Reads the current record and writes back `updater`'s patch, all inside a
 * single lock — so callers that need `current` to compute their patch (e.g.
 * toggling a value in an array) can't race with another concurrent update
 * for the same token+slug.
 */
async function save(
  token: string,
  slug: string,
  updater: Partial<ReaderProgress> | ((current: ReaderProgress) => Partial<ReaderProgress>)
): Promise<ReaderProgress> {
  return withLock(lockKey(token, slug), async () => {
    const current = await getReaderProgress(token, slug);
    const patch = typeof updater === "function" ? updater(current) : updater;
    const next: ReaderProgress = { ...current, ...patch, updatedAt: new Date().toISOString() };
    await getKv().set(key(token, slug), next);
    return next;
  });
}

export async function saveEbookPage(token: string, slug: string, page: number): Promise<ReaderProgress> {
  return save(token, slug, { ebookPage: page });
}

export async function savePlannerPage(token: string, slug: string, page: number): Promise<ReaderProgress> {
  return save(token, slug, { plannerPage: page });
}

export async function toggleBookmark(token: string, slug: string, page: number): Promise<ReaderProgress> {
  return save(token, slug, (current) => ({
    ebookBookmarks: current.ebookBookmarks.includes(page)
      ? current.ebookBookmarks.filter((p) => p !== page)
      : [...current.ebookBookmarks, page].sort((a, b) => a - b),
  }));
}

export async function toggleDayComplete(token: string, slug: string, day: number): Promise<ReaderProgress> {
  return save(token, slug, (current) => ({
    completedDays: current.completedDays.includes(day)
      ? current.completedDays.filter((d) => d !== day)
      : [...current.completedDays, day].sort((a, b) => a - b),
  }));
}

export async function saveDayNote(token: string, slug: string, day: number, note: string): Promise<ReaderProgress> {
  return save(token, slug, (current) => ({ dayNotes: { ...current.dayNotes, [day]: note } }));
}
