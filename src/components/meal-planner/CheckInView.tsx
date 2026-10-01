"use client";

import { useEffect, useState } from "react";
import { useMealPlanner } from "./useMealPlanner";
import { todayISO, formatDateLong } from "@/lib/mealPlanner";

export default function CheckInView({ planner }: { planner: ReturnType<typeof useMealPlanner> }) {
  const { state, dispatch } = planner;
  const today = todayISO();
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (state) setNote(state.checkIns[today]?.note ?? "");
  }, [state, today]);

  if (!state) return null;

  async function save() {
    setSaved(false);
    const result = await dispatch({ type: "saveCheckIn", date: today, note });
    if (result.ok) {
      setError(null);
      setSaved(true);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  const recentCheckIns = Object.entries(state.checkIns)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 10);

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <span className="eyebrow">Reflect</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Daily Check-in</h1>
        <p className="mt-2 text-ink-500">A quick note on how today&apos;s eating routine went.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        <div className="mt-8 card p-6">
          <p className="text-sm font-bold text-ink-800">{formatDateLong(today)}</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="How did today's routine go? Anything you want to try differently tomorrow?"
            className="mt-3 w-full rounded-lg border border-ink-900/15 bg-white px-3.5 py-3 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
          />
          <div className="mt-3 flex items-center gap-3">
            <button type="button" onClick={save} className="btn-gold !px-5 !py-2.5 text-sm">
              Save Check-in
            </button>
            {saved && <span className="text-xs font-semibold text-brand-700">Saved.</span>}
          </div>
        </div>

        {recentCheckIns.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-lg font-bold text-ink-900">Recent Check-ins</h2>
            <div className="mt-4 space-y-3">
              {recentCheckIns.map(([date, entry]) => (
                <div key={date} className="card p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-400">{formatDateLong(date)}</p>
                  <p className="mt-1.5 text-sm text-ink-700">{entry.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
