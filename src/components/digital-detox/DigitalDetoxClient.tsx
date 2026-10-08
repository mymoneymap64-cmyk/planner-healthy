"use client";

import { useState } from "react";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";
import DashboardLoading from "@/components/wellness-dashboard/DashboardLoading";
import { useDigitalDetox } from "./useDigitalDetox";
import { DETOX_DAYS } from "@/lib/digitalDetox";

export default function DigitalDetoxClient({ token }: { token: string }) {
  const { state, stats, loaded, dispatch } = useDigitalDetox(token);
  const [error, setError] = useState<string | null>(null);

  if (!loaded || !state || !stats) {
    return <DashboardLoading label="Loading your 7-Day Digital Detox..." />;
  }

  async function handle(action: Parameters<typeof dispatch>[0]) {
    const result = await dispatch(action);
    setError(result.ok ? null : result.error ?? "Something went wrong. Please try again.");
  }

  const today = stats.currentDay != null ? DETOX_DAYS.find((d) => d.day === stats.currentDay) : null;

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="eyebrow bg-detox-sageLight text-detox-forest">
              <Sparkles size={13} /> 7-Day Digital Detox
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Your Offline Reset</h1>
            <p className="mt-2 text-ink-500">
              {stats.completedCount} of {stats.totalDays} days complete.
            </p>
          </div>
          <ProgressRing percent={stats.percent} size={84} label="Complete" />
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        {/* Today's Challenge */}
        {today ? (
          <div className="mt-8 rounded-2xl border border-detox-sage/30 bg-detox-sand p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wide text-detox-terracotta">
              Day {today.day} · Today&apos;s Challenge
            </p>
            <h2 className="mt-2 font-display text-xl font-bold text-detox-forest sm:text-2xl">{today.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700 sm:text-base">{today.action}</p>
            <button
              type="button"
              onClick={() => handle({ type: "toggleDay", day: today.day })}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-detox-forest px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-detox-forest/90"
            >
              <Check size={16} /> Mark Day {today.day} Complete
            </button>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-detox-sage/30 bg-detox-sand p-6 text-center sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wide text-detox-terracotta">Challenge Complete</p>
            <h2 className="mt-2 font-display text-xl font-bold text-detox-forest sm:text-2xl">
              You finished all 7 days
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              Nice work stepping away from the screen. Restart anytime to run through it again.
            </p>
          </div>
        )}

        {/* 7-day list */}
        <div className="mt-8 space-y-2.5">
          {DETOX_DAYS.map((d) => {
            const done = state.completedDays.includes(d.day);
            const isToday = stats.currentDay === d.day;
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => handle({ type: "toggleDay", day: d.day })}
                className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors motion-reduce:transition-none ${
                  isToday
                    ? "border-detox-terracotta bg-detox-sand"
                    : done
                      ? "border-detox-sage/30 bg-detox-sageLight/40"
                      : "border-ink-900/10 bg-white hover:border-detox-sage/40"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-transform motion-reduce:transition-none ${
                    done
                      ? "scale-100 border-detox-forest bg-detox-forest text-white"
                      : isToday
                        ? "border-detox-terracotta text-detox-terracotta"
                        : "border-ink-300 text-ink-400"
                  }`}
                >
                  {done ? <Check size={16} strokeWidth={3} /> : d.day}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-bold ${done ? "text-ink-500 line-through" : "text-ink-900"}`}
                  >
                    Day {d.day}: {d.title}
                  </p>
                  <p className={`mt-0.5 text-xs leading-relaxed ${done ? "text-ink-400" : "text-ink-500"}`}>
                    {d.action}
                  </p>
                </div>
                {isToday && (
                  <span className="shrink-0 rounded-full bg-detox-terracotta px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Today
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {stats.completedCount > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Restart the 7-Day Digital Detox? This clears all completed days.")) {
                  handle({ type: "reset" });
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-400 hover:text-ink-700"
            >
              <RotateCcw size={13} /> Restart Challenge
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-ink-400">
          This challenge is a general wellness and lifestyle practice — not medical advice.
        </p>
      </div>
    </div>
  );
}
