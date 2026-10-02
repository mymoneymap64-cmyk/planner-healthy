"use client";

import { Quote as QuoteIcon, Flame, BookOpen, Sun, CalendarRange, Sparkles } from "lucide-react";
import { formatDateLong, getDailyQuote, greetingForNow, todayISO } from "@/lib/wellnessDashboard";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";
import TaskList from "@/components/wellness-dashboard/TaskList";
import { DemoWellnessState } from "../useDemoWellnessState";

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

export default function DemoHome({ demo }: { demo: DemoWellnessState }) {
  const { dashboard, dashboardStats, toggleTaskToday } = demo;
  const doneToday = dashboard.activity[todayISO()] ?? [];
  const quote = getDailyQuote();
  const greeting = greetingForNow();

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <span className="eyebrow">
          <Sparkles size={13} /> Your Wellness Journey
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          {greeting === "Good Morning" ? "Good Morning ☀️" : greeting === "Good Afternoon" ? "Good Afternoon ☀️" : "Good Evening ☀️"}
        </h1>
        <p className="mt-2 text-base text-ink-500">Small steps make a big difference.</p>
        <p className="mt-1 text-sm font-semibold text-ink-400">{formatDateLong()}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="card p-6 lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-ink-900">Today&apos;s Focus</h2>
            <div className="mt-4">
              <TaskList tasks={dashboard.todaysFocus} doneIds={doneToday} onToggle={toggleTaskToday} />
            </div>
          </div>

          <div className="card flex flex-col items-center p-6 text-center">
            <h2 className="font-display text-lg font-bold text-ink-900">Daily Progress</h2>
            <div className="mt-4">
              <ProgressRing percent={dashboardStats.dailyPercent} size={110} label="Today" />
            </div>
            <div className="mt-6 w-full">
              <WeekChart week={dashboardStats.weekChart} />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="card bg-brand-900 p-6 text-white lg:col-span-1">
            <QuoteIcon size={22} className="text-gold-300" />
            <p className="mt-3 font-display text-base font-semibold italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
          </div>

          <div className="card p-6 lg:col-span-2">
            <h2 className="font-display text-lg font-bold text-ink-900">My Progress</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Daily", value: `${dashboardStats.dailyPercent}%`, icon: Sun },
                { label: "Weekly", value: `${dashboardStats.weeklyPercent}%`, icon: CalendarRange },
                { label: "Current Streak", value: `${dashboardStats.currentStreak}d`, icon: Flame },
                { label: "Wellness Days", value: `${dashboardStats.totalWellnessDays}`, icon: BookOpen },
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

        <p className="mt-10 text-center text-xs text-ink-400">
          This is a live preview with sample data — nothing here is saved or tied to a real account.
        </p>
      </div>
    </div>
  );
}
