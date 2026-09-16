"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { WellnessNote } from "@/lib/wellness";

const MAX_NOTE_LENGTH = 5000;

export default function NotesEditor({
  token,
  slug,
  title,
  placeholder,
}: {
  token: string;
  slug: string;
  title: string;
  placeholder: string;
}) {
  const [notes, setNotes] = useState<WellnessNote[]>([]);
  const [draft, setDraft] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/wellness/${token}/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setNotes(data.notes ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [token, slug]);

  async function addNote() {
    const body = draft.trim();
    if (!body) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/wellness/${token}/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "addNote", body }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(data.notes ?? []);
        setDraft("");
      }
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote(noteId: string) {
    if (!window.confirm("Delete this note?")) return;
    const res = await fetch(`/api/wellness/${token}/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "deleteNote", noteId }),
    });
    const data = await res.json();
    if (res.ok) setNotes(data.notes ?? []);
  }

  return (
    <div className="card p-5 sm:p-6">
      <h2 className="font-display text-lg font-bold text-ink-900">{title}</h2>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value.slice(0, MAX_NOTE_LENGTH))}
        placeholder={placeholder}
        rows={3}
        disabled={!loaded}
        className="mt-3 w-full rounded-lg border border-ink-900/15 bg-white p-3 text-sm text-ink-800 focus:border-brand-500 focus:outline-none disabled:opacity-60"
      />
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-ink-400">
          {draft.length} / {MAX_NOTE_LENGTH}
        </span>
        <button
          type="button"
          onClick={addNote}
          disabled={!loaded || saving || !draft.trim()}
          className="btn-gold px-4 py-2 text-xs disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Note"}
        </button>
      </div>

      {notes.length > 0 && (
        <div className="mt-6 space-y-3 border-t border-ink-900/[0.07] pt-5">
          {notes.map((note) => (
            <div key={note.id} className="rounded-lg border border-ink-900/10 bg-cream p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="whitespace-pre-wrap text-sm text-ink-700">{note.body}</p>
                <button
                  type="button"
                  onClick={() => deleteNote(note.id)}
                  aria-label="Delete note"
                  className="shrink-0 text-ink-400 hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-ink-400">
                {new Date(note.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
