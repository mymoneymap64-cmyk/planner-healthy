"use client";

import { useState } from "react";
import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import TaskList from "@/components/wellness-dashboard/TaskList";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";
import DashboardLoading from "@/components/wellness-dashboard/DashboardLoading";
import { DailyPlanSection, todayISO } from "@/lib/wellnessDashboard";

const SECTIONS: { key: DailyPlanSection; label: string }[] = [
  { key: "morning", label: "Morning" },
  { key: "afternoon", label: "Afternoon" },
  { key: "evening", label: "Evening" },
];

export default function DailyPlanClient({ token }: { token: string }) {
  const { state, loaded, dispatch } = useWellnessDashboard(token);
  const [error, setError] = useState<string | null>(null);

  if (!loaded || !state) {
    return <DashboardLoading label="Loading your daily plan..." />;
  }

  const doneToday = state.activity[todayISO()] ?? [];
  const allTasks = [...state.dailyPlan.morning, ...state.dailyPlan.afternoon, ...state.dailyPlan.evening];
  const completed = allTasks.filter((t) => doneToday.includes(t.id)).length;
  const percent = allTasks.length > 0 ? Math.round((completed / allTasks.length) * 100) : 0;

  async function handle(action: Parameters<typeof dispatch>[0]) {
    const result = await dispatch(action);
    setError(result.ok ? null : result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="eyebrow">Your Routine</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Daily Plan</h1>
            <p className="mt-2 text-ink-500">
              {completed} of {allTasks.length} tasks completed today.
            </p>
          </div>
          <ProgressRing percent={percent} size={84} label="Today" />
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <div key={section.key} className="card p-6">
              <h2 className="font-display text-lg font-bold text-ink-900">{section.label}</h2>
              <div className="mt-4">
                <TaskList
                  tasks={state.dailyPlan[section.key]}
                  doneIds={doneToday}
                  onToggle={(taskId) => handle({ type: "toggleTaskToday", taskId })}
                  onAdd={(label) => handle({ type: "addDailyPlanTask", section: section.key, label })}
                  onDelete={(taskId) => handle({ type: "deleteDailyPlanTask", section: section.key, taskId })}
                  onReorder={(taskId, direction) =>
                    handle({ type: "reorderDailyPlanTask", section: section.key, taskId, direction })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
