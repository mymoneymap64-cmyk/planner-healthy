"use client";

import { useState } from "react";
import Link from "next/link";
import { Quote as QuoteIcon, Flame, BookOpen, Sun, CalendarRange, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import { formatDateLong, getDailyQuote, greetingForNow, todayISO } from "@/lib/wellnessDashboard";
import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import ProductCover from "@/components/ProductCover";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";
import TaskList from "@/components/wellness-dashboard/TaskList";
import DashboardLoading from "@/components/wellness-dashboard/DashboardLoading";

function WeekChart({ week }: { week: { label: string; percent: number }[] }) {
  return (
    <div className="flex items-end justify-between gap-2">
      {week.map((day, i) => {
        const isFuture = day.percent < 0;
        const height = isFuture ? 6 : Math.max(6, (day.percent / 100) * 48);
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="relative flex h-12 w-full items-end justify-center">
              <div className="absolute bottom-0 h-1.5 w-2.5 rounded-full bg-ink-900/[0.06]" />
              <div
                className={`relative w-2.5 rounded-full transition-all ${isFuture ? "bg-ink-900/[0.06]" : "bg-brand-600"}`}
                style={{ height }}
              />
            </div>
            <span className="text-[10px] font-bold text-ink-400">{day.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function HomeDashboard({ token, products }: { token: string; products: Product[] }) {
  const { state, stats, loaded, dispatch } = useWellnessDashboard(token);
  const [error, setError] = useState<string | null>(null);

  if (!loaded || !state || !stats) {
    return <DashboardLoading label="Loading your dashboard..." />;
  }

  const doneToday = state.activity[todayISO()] ?? [];
  const quote = getDailyQuote();

  async function handleToggle(taskId: string) {
    const result = await dispatch({ type: "toggleTaskToday", taskId });
    if (!result.ok) setError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <span className="eyebrow">
          <Sparkles size={13} /> Your Wellness Journey
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {greetingForNow() === "Good Morning" ? "Good Morning ☀️" : greetingForNow() === "Good Afternoon" ? "Good Afternoon ☀️" : "Good Evening ☀️"}
        </h1>
        <p className="mt-2 text-base text-ink-500">Small steps make a big difference.</p>
        <p className="mt-1 text-sm font-semibold text-ink-400">{formatDateLong()}</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Today's Focus */}
          <div className="card p-6 lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-ink-900">Today&apos;s Focus</h2>
            <div className="mt-4">
              <TaskList tasks={state.todaysFocus} doneIds={doneToday} onToggle={handleToggle} />
            </div>
          </div>

          {/* Daily Progress */}
          <div className="card flex flex-col items-center p-6 text-center">
            <h2 className="font-display text-lg font-bold text-ink-900">Daily Progress</h2>
            <div className="mt-4">
              <ProgressRing percent={stats.dailyPercent} size={110} label="Today" />
            </div>
            <div className="mt-6 w-full">
              <WeekChart week={stats.weekChart} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Daily Quote */}
          <div className="card bg-brand-900 p-6 text-white lg:col-span-1">
            <QuoteIcon size={22} className="text-gold-300" />
            <p className="mt-3 font-display text-base font-semibold italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
          </div>

          {/* My Progress */}
          <div className="card p-6 lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-ink-900">My Progress</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Daily", value: `${stats.dailyPercent}%`, icon: Sun },
                { label: "Weekly", value: `${stats.weeklyPercent}%`, icon: CalendarRange },
                { label: "Current Streak", value: `${stats.currentStreak}d`, icon: Flame },
                { label: "Wellness Days", value: `${stats.totalWellnessDays}`, icon: BookOpen },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-ink-50 p-3 text-center">
                  <s.icon size={16} className="mx-auto text-brand-600" />
                  <p className="mt-1.5 font-display text-lg font-black text-ink-900">{s.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explore Your Guides */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink-900">Explore Your Guides</h2>
            <Link href={`/wellness/${token}/library`} className="text-sm font-bold text-brand-700 hover:underline">
              View All
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <Link
                key={product.slug}
                href={`/wellness/${token}/${product.slug}`}
                className="group overflow-hidden rounded-xl border border-ink-900/10 bg-white transition-shadow hover:shadow-lift"
              >
                <ProductCover product={product} className="aspect-[3/4] w-full" />
                <p className="p-2.5 text-center text-xs font-bold text-ink-800 group-hover:text-brand-700">
                  {product.categoryLabel}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
