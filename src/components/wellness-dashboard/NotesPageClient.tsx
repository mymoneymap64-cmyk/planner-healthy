"use client";

import { useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import FavoriteButton from "@/components/wellness-dashboard/FavoriteButton";
import DashboardLoading from "@/components/wellness-dashboard/DashboardLoading";
import { formatDateLong } from "@/lib/wellnessDashboard";

const MAX_NOTE_LENGTH = 5000;

export default function NotesPageClient({ token }: { token: string }) {
  const { state, prompts, loaded, dispatch } = useWellnessDashboard(token);
  const [draft, setDraft] = useState("");
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!state) return [];
    const q = query.trim().toLowerCase();
    if (!q) return state.journal;
    return state.journal.filter((n) => n.body.toLowerCase().includes(q));
  }, [state, query]);

  if (!loaded || !state) {
    return <DashboardLoading label="Loading your journal..." />;
  }

  async function handleSave() {
    if (!draft.trim()) return;
    const result = await dispatch({ type: "addJournalEntry", body: draft, prompt: activePrompt });
    if (result.ok) {
      setDraft("");
      setActivePrompt(null);
      setError(null);
    } else {
      setError(result.error ?? "Couldn't save that entry. Please try again.");
    }
  }

  async function handleUpdate(id: string) {
    if (!editDraft.trim()) return;
    const result = await dispatch({ type: "updateJournalEntry", id, body: editDraft });
    if (result.ok) {
      setEditingId(null);
      setError(null);
    } else {
      setError(result.error ?? "Couldn't save that change. Please try again.");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this note? This can't be undone.")) return;
    const result = await dispatch({ type: "deleteJournalEntry", id });
    if (!result.ok) setError(result.error ?? "Couldn't delete this note. Please try again.");
  }

  async function handleToggleFavorite(id: string) {
    const result = await dispatch({ type: "toggleFavorite", kind: "notes", id });
    if (!result.ok) setError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page max-w-3xl">
        <span className="eyebrow">Your Journal</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Notes &amp; Journal</h1>
        <p className="mt-2 text-ink-500">A calm, private place for reflections, ideas, and reminders.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        <div className="card mt-8 p-6">
          <div className="flex flex-wrap gap-2">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setActivePrompt(prompt);
                  if (!draft) setDraft("");
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activePrompt === prompt
                    ? "border-brand-600 bg-brand-50 text-brand-800"
                    : "border-ink-900/15 text-ink-600 hover:border-brand-400"
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>

          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, MAX_NOTE_LENGTH))}
            placeholder={activePrompt ?? "Write what's on your mind..."}
            aria-label="Write a new journal entry"
            rows={4}
            className="mt-4 w-full rounded-lg border border-ink-900/15 bg-white p-3 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-ink-400">
              {draft.length} / {MAX_NOTE_LENGTH}
            </span>
            <button type="button" onClick={handleSave} disabled={!draft.trim()} className="btn-gold px-5 py-2 text-sm disabled:opacity-40">
              Save Entry
            </button>
          </div>
        </div>

        <div className="relative mt-8">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your notes..."
            aria-label="Search notes"
            className="w-full rounded-lg border border-ink-900/15 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="mt-5 space-y-3">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-ink-400">
              {state.journal.length === 0 ? "No entries yet — write your first one above." : "No notes match your search."}
            </p>
          )}
          {filtered.map((note) => {
            const isFavorite = state.favorites.notes.includes(note.id);
            const isEditing = editingId === note.id;
            return (
              <div key={note.id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {note.prompt && (
                      <p className="text-[11px] font-bold uppercase tracking-wide text-brand-600">{note.prompt}</p>
                    )}
                    <p className="text-xs text-ink-400">{formatDateLong(new Date(note.createdAt))}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <FavoriteButton
                      active={isFavorite}
                      onToggle={() => handleToggleFavorite(note.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 hover:text-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(note.id)}
                      aria-label="Delete note"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-3">
                    <textarea
                      value={editDraft}
                      onChange={(e) => setEditDraft(e.target.value.slice(0, MAX_NOTE_LENGTH))}
                      aria-label="Edit journal entry"
                      rows={3}
                      className="w-full rounded-lg border border-ink-900/15 bg-white p-3 text-sm focus:border-brand-500 focus:outline-none"
                    />
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => handleUpdate(note.id)} className="btn-gold px-4 py-1.5 text-xs">
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-ink-900/15 px-4 py-1.5 text-xs font-bold text-ink-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(note.id);
                      setEditDraft(note.body);
                    }}
                    className="mt-3 block w-full whitespace-pre-wrap text-left text-sm leading-relaxed text-ink-700"
                  >
                    {note.body}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
