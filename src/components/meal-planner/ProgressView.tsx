"use client";

import { Flame, Trophy } from "lucide-react";
import { useMealPlanner } from "./useMealPlanner";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";

function TrendBars({ days }: { days: { date: string; percent: number }[] }) {
  return (
    <div className="flex items-end justify-between gap-[3px]">
      {days.map((d) => {
        const height = Math.max(4, (d.percent / 100) * 56);
        return (
          <div key={d.date} className="relative flex h-14 flex-1 items-end justify-center" title={`${d.date}: ${d.percent}%`}>
            <div
              className={`w-full rounded-sm transition-all ${d.percent > 0 ? "bg-brand-600" : "bg-ink-900/[0.06]"}`}
              style={{ height }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function ProgressView({ planner }: { planner: ReturnType<typeof useMealPlanner> }) {
  const { stats } = planner;

  if (!stats) return null;

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <span className="eyebrow">Progress</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">30-Day Tracking</h1>
        <p className="mt-2 text-ink-500">How consistently you&apos;ve followed your planned meals.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="card flex items-center gap-4 p-5">
            <ProgressRing percent={stats.dailyPercent} size={56} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Today</p>
              <p className="text-sm text-ink-600">
                {stats.completedToday}/{stats.totalToday} meals
              </p>
            </div>
          </div>
          <div className="card flex items-center gap-4 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 text-gold-600">
              <Flame size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Current Streak</p>
              <p className="text-lg font-bold text-ink-900">
                {stats.currentStreak} {stats.currentStreak === 1 ? "day" : "days"}
              </p>
            </div>
          </div>
          <div className="card flex items-center gap-4 p-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Best Streak</p>
              <p className="text-lg font-bold text-ink-900">
                {stats.longestStreak} {stats.longestStreak === 1 ? "day" : "days"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 card p-6">
          <h2 className="font-display text-lg font-bold text-ink-900">Last 30 Days</h2>
          <div className="mt-5">
            <TrendBars days={stats.last30} />
          </div>
          <p className="mt-4 text-xs text-ink-400">
            {stats.totalTrackedDays} of the last 30 days had at least one completed meal.
          </p>
        </div>
      </div>
    </div>
  );
}
