"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useMealPlanner } from "./useMealPlanner";

export default function MyMealsView({ planner }: { planner: ReturnType<typeof useMealPlanner> }) {
  const { state, dispatch } = planner;
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!state) return null;

  async function handle(action: Parameters<typeof dispatch>[0]) {
    const result = await dispatch(action);
    setError(result.ok ? null : result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <span className="eyebrow">Saved Meals</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">My Meals</h1>
        <p className="mt-2 text-ink-500">Save meals you make often so you can reuse them from the Today tab.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        <div className="mt-8 card p-6">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Meal name, e.g. Greek yogurt + berries"
              className="flex-1 rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
            />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note"
              className="flex-1 rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={async () => {
                if (!name.trim()) return;
                await handle({ type: "addMealTemplate", name, note });
                setName("");
                setNote("");
              }}
              disabled={!name.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-lg bg-ink-950 text-white disabled:opacity-40"
              aria-label="Save meal"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mt-5 space-y-2">
            {state.mealTemplates.length === 0 ? (
              <p className="text-sm text-ink-400">No saved meals yet.</p>
            ) : (
              state.mealTemplates.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink-800">{t.name}</p>
                    {t.note && <p className="text-xs text-ink-500">{t.note}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handle({ type: "deleteMealTemplate", id: t.id })}
                    aria-label={`Delete ${t.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded text-ink-400 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
