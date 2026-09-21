"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import ProgressBar from "@/components/reader/ProgressBar";
import FavoriteButton from "@/components/wellness-dashboard/FavoriteButton";
import DashboardLoading from "@/components/wellness-dashboard/DashboardLoading";

export default function ChecklistsPageClient({ token }: { token: string }) {
  const { state, loaded, dispatch } = useWellnessDashboard(token);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [itemsText, setItemsText] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!loaded || !state) {
    return <DashboardLoading label="Loading your checklists..." />;
  }

  async function handleCreate() {
    const items = itemsText.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!title.trim() || items.length === 0) return;
    const result = await dispatch({ type: "createChecklist", title, items });
    if (result.ok) {
      setTitle("");
      setItemsText("");
      setCreating(false);
      setError(null);
    } else {
      setError(result.error ?? "Couldn't create that checklist. Please try again.");
    }
  }

  async function handleToggleFavorite(checklistId: string) {
    const result = await dispatch({ type: "toggleFavorite", kind: "checklists", id: checklistId });
    if (!result.ok) setError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Stay On Track</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Checklists</h1>
          </div>
          <button type="button" onClick={() => setCreating((v) => !v)} className="btn-gold">
            <Plus size={16} /> New Checklist
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        {creating && (
          <div className="card mt-6 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-ink-900">Create a Checklist</h2>
              <button type="button" onClick={() => setCreating(false)} aria-label="Close" className="text-ink-400">
                <X size={16} />
              </button>
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Checklist name"
              aria-label="Checklist name"
              className="mt-3 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
            <textarea
              value={itemsText}
              onChange={(e) => setItemsText(e.target.value)}
              placeholder={"One item per line, e.g.\nDrink water\nStretch\nPlan tomorrow"}
              aria-label="Checklist items, one per line"
              rows={4}
              className="mt-2 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCreate}
              disabled={!title.trim() || !itemsText.trim()}
              className="btn-gold mt-3 disabled:opacity-40"
            >
              Create Checklist
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {state.checklists.map((checklist) => {
            const completed = checklist.items.filter((i) => i.done).length;
            const percent = checklist.items.length > 0 ? (completed / checklist.items.length) * 100 : 0;
            const isFavorite = state.favorites.checklists.includes(checklist.id);

            return (
              <div key={checklist.id} className="card p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-ink-900">{checklist.title}</h3>
                  <FavoriteButton
                    active={isFavorite}
                    onToggle={() => handleToggleFavorite(checklist.id)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-400 hover:text-red-500"
                  />
                </div>
                <p className="mt-1 text-xs text-ink-500">
                  {completed} of {checklist.items.length} completed
                </p>
                <div className="mt-3">
                  <ProgressBar value={percent} />
                </div>
                <Link
                  href={`/wellness/${token}/checklists/${checklist.id}`}
                  className="btn-secondary mt-4 w-full justify-center py-2 text-sm"
                >
                  Open Checklist
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
