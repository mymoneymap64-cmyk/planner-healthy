"use client";

import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import TaskList from "@/components/wellness-dashboard/TaskList";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";
import { DailyPlanSection, todayISO } from "@/lib/wellnessDashboard";

const SECTIONS: { key: DailyPlanSection; label: string }[] = [
  { key: "morning", label: "Morning" },
  { key: "afternoon", label: "Afternoon" },
  { key: "evening", label: "Evening" },
];

export default function DailyPlanClient({ token }: { token: string }) {
  const { state, loaded, dispatch } = useWellnessDashboard(token);

  if (!loaded || !state) {
    return <div className="section-pad text-center text-sm text-ink-400">Loading your daily plan...</div>;
  }

  const doneToday = state.activity[todayISO()] ?? [];
  const allTasks = [...state.dailyPlan.morning, ...state.dailyPlan.afternoon, ...state.dailyPlan.evening];
  const completed = allTasks.filter((t) => doneToday.includes(t.id)).length;
  const percent = allTasks.length > 0 ? Math.round((completed / allTasks.length) * 100) : 0;

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

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <div key={section.key} className="card p-6">
              <h2 className="font-display text-lg font-bold text-ink-900">{section.label}</h2>
              <div className="mt-4">
                <TaskList
                  tasks={state.dailyPlan[section.key]}
                  doneIds={doneToday}
                  onToggle={(taskId) => dispatch({ type: "toggleTaskToday", taskId })}
                  onAdd={(label) => dispatch({ type: "addDailyPlanTask", section: section.key, label })}
                  onDelete={(taskId) => dispatch({ type: "deleteDailyPlanTask", section: section.key, taskId })}
                  onReorder={(taskId, direction) =>
                    dispatch({ type: "reorderDailyPlanTask", section: section.key, taskId, direction })
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
