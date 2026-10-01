"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useMealPlanner } from "./useMealPlanner";

export default function SimpleChecklistView({
  planner,
  list,
  eyebrow,
  title,
  description,
  placeholder,
}: {
  planner: ReturnType<typeof useMealPlanner>;
  list: "groceryList" | "prepList";
  eyebrow: string;
  title: string;
  description: string;
  placeholder: string;
}) {
  const { state, dispatch } = planner;
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!state) return null;

  const items = state[list];
  const hasCompleted = items.some((i) => i.done);

  async function handle(action: Parameters<typeof dispatch>[0]) {
    const result = await dispatch(action);
    setError(result.ok ? null : result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">{title}</h1>
            <p className="mt-2 text-ink-500">{description}</p>
          </div>
          {hasCompleted && (
            <button
              type="button"
              onClick={() => handle({ type: "clearCompletedListItems", list })}
              className="btn-secondary !px-4 !py-2 text-xs"
            >
              Clear Completed
            </button>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        <div className="mt-8 card p-6">
          <div className="space-y-2">
            {items.length === 0 ? (
              <p className="text-sm text-ink-400">Nothing here yet.</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors ${
                    item.done ? "border-brand-300 bg-brand-50" : "border-ink-900/10 bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handle({ type: "toggleListItem", list, id: item.id })}
                    aria-label={item.done ? `Mark "${item.label}" as not done` : `Mark "${item.label}" as done`}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                      item.done ? "border-brand-600 bg-brand-600" : "border-ink-300"
                    }`}
                  />
                  <span className={`flex-1 text-sm ${item.done ? "text-ink-500 line-through" : "text-ink-800"}`}>
                    {item.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => handle({ type: "deleteListItem", list, id: item.id })}
                    aria-label={`Delete "${item.label}"`}
                    className="flex h-6 w-6 items-center justify-center rounded text-ink-400 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && draft.trim()) {
                  e.preventDefault();
                  handle({ type: "addListItem", list, label: draft });
                  setDraft("");
                }
              }}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (!draft.trim()) return;
                handle({ type: "addListItem", list, label: draft });
                setDraft("");
              }}
              disabled={!draft.trim()}
              aria-label="Add item"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-950 text-white disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
