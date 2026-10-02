"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import FavoriteButton from "@/components/wellness-dashboard/FavoriteButton";
import { formatDateLong } from "@/lib/wellnessDashboard";
import { DemoWellnessState } from "../useDemoWellnessState";

export default function DemoNotes({ demo }: { demo: DemoWellnessState }) {
  const { dashboard, addNote, deleteNote, toggleFavorite } = demo;
  const [draft, setDraft] = useState("");

  return (
    <div className="section-pad !pt-8">
      <div className="container-page max-w-3xl">
        <span className="eyebrow">Your Journal</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Notes &amp; Journal</h1>
        <p className="mt-2 text-ink-500">A calm, private place for reflections, ideas, and reminders.</p>

        <div className="card mt-8 p-6">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write what's on your mind..."
            rows={4}
            className="w-full rounded-lg border border-ink-900/15 bg-white p-3 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => {
                addNote(draft);
                setDraft("");
              }}
              disabled={!draft.trim()}
              className="btn-gold px-5 py-2 text-sm disabled:opacity-40"
            >
              Save Entry
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {dashboard.journal.map((note) => {
            const isFavorite = dashboard.favorites.notes.includes(note.id);
            return (
              <div key={note.id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {note.prompt && <p className="text-[11px] font-bold uppercase tracking-wide text-brand-600">{note.prompt}</p>}
                    <p className="text-xs text-ink-400">{formatDateLong(new Date(note.createdAt))}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <FavoriteButton
                      active={isFavorite}
                      onToggle={() => toggleFavorite("notes", note.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 hover:text-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => deleteNote(note.id)}
                      aria-label="Delete note"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-700">{note.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
