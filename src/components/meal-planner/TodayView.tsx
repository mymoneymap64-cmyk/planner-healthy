"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useMealPlanner } from "./useMealPlanner";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";
import { formatDateLong, formatTime12h, todayISO } from "@/lib/mealPlanner";

export default function TodayView({ planner }: { planner: ReturnType<typeof useMealPlanner> }) {
  const { state, stats, dispatch } = planner;
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  if (!state || !stats) return null;

  const today = todayISO();
  const dayMeals = state.mealsByDate[today] ?? {};
  const slots = [...state.scheduleSlots].sort((a, b) => a.time.localeCompare(b.time));

  async function handle(action: Parameters<typeof dispatch>[0]) {
    const result = await dispatch(action);
    setError(result.ok ? null : result.error ?? "Something went wrong. Please try again.");
  }

  function mealNameFor(slotId: string): string {
    return drafts[slotId] ?? dayMeals[slotId]?.mealName ?? "";
  }

  function quickAdd(slotId: string, mealName: string) {
    setDrafts((d) => ({ ...d, [slotId]: mealName }));
    handle({ type: "setMealName", date: today, slotId, mealName });
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Today&apos;s Meal Plan</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">{formatDateLong(today)}</h1>
            <p className="mt-2 text-ink-500">
              {stats.completedToday} of {stats.totalToday} meals completed today.
            </p>
          </div>
          <ProgressRing percent={stats.dailyPercent} size={84} label="Today" />
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        {slots.length === 0 ? (
          <p className="mt-8 text-sm text-ink-500">No meal times yet — add one from the Weekly Plan tab.</p>
        ) : (
          <div className="mt-8 space-y-3">
            {slots.map((slot) => {
              const entry = dayMeals[slot.id];
              const completed = entry?.status === "completed";
              return (
                <div key={slot.id} className="card flex items-center gap-4 p-4 sm:p-5">
                  <div className="w-20 shrink-0 text-sm font-bold text-ink-700">{formatTime12h(slot.time)}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{slot.label}</p>
                    <input
                      value={mealNameFor(slot.id)}
                      onChange={(e) => setDrafts((d) => ({ ...d, [slot.id]: e.target.value }))}
                      onBlur={(e) => {
                        if (e.target.value !== (dayMeals[slot.id]?.mealName ?? "")) {
                          handle({ type: "setMealName", date: today, slotId: slot.id, mealName: e.target.value });
                        }
                      }}
                      placeholder="Add meal..."
                      className={`mt-1 w-full border-b border-dashed border-ink-900/15 bg-transparent py-1 text-sm focus:border-brand-500 focus:outline-none ${
                        completed ? "text-ink-400 line-through" : "text-ink-800"
                      }`}
                    />
                    {state.mealTemplates.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {state.mealTemplates.slice(0, 4).map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => quickAdd(slot.id, t.name)}
                            className="rounded-full bg-ink-900/5 px-2.5 py-0.5 text-[11px] font-semibold text-ink-600 hover:bg-ink-900/10"
                          >
                            {t.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handle({ type: "toggleMealStatus", date: today, slotId: slot.id })}
                    aria-label={completed ? "Mark as planned" : "Mark as completed"}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      completed ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 text-transparent"
                    }`}
                  >
                    <Check size={16} strokeWidth={3} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
