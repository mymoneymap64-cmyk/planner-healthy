"use client";

import ProgressBar from "@/components/reader/ProgressBar";
import FavoriteButton from "@/components/wellness-dashboard/FavoriteButton";
import { DemoWellnessState } from "../useDemoWellnessState";

export default function DemoChecklists({ demo }: { demo: DemoWellnessState }) {
  const { dashboard, toggleChecklistItem, toggleFavorite } = demo;

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <span className="eyebrow">Stay On Track</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Checklists</h1>
        <p className="mt-2 text-ink-500">Tap any item below — it&apos;s fully interactive, just not saved anywhere.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dashboard.checklists.map((checklist) => {
            const completed = checklist.items.filter((i) => i.done).length;
            const percent = checklist.items.length > 0 ? (completed / checklist.items.length) * 100 : 0;
            const isFavorite = dashboard.favorites.checklists.includes(checklist.id);

            return (
              <div key={checklist.id} className="card p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-ink-900">{checklist.title}</h3>
                  <FavoriteButton
                    active={isFavorite}
                    onToggle={() => toggleFavorite("checklists", checklist.id)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-400 hover:text-red-500"
                  />
                </div>
                <p className="mt-1 text-xs text-ink-500">
                  {completed} of {checklist.items.length} completed
                </p>
                <div className="mt-3">
                  <ProgressBar value={percent} />
                </div>
                <div className="mt-4 space-y-2">
                  {checklist.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleChecklistItem(checklist.id, item.id)}
                      className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                        item.done ? "border-brand-300 bg-brand-50 text-ink-500 line-through" : "border-ink-900/10 bg-white text-ink-800"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 ${
                          item.done ? "border-brand-600 bg-brand-600" : "border-ink-300"
                        }`}
                      />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
