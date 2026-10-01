"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Printer, Trash2 } from "lucide-react";
import { useMealPlanner } from "./useMealPlanner";
import { formatDateLong, formatTime12h, weekDatesFor, todayISO } from "@/lib/mealPlanner";

export default function WeekView({ planner }: { planner: ReturnType<typeof useMealPlanner> }) {
  const { token, state, dispatch } = planner;
  const [error, setError] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [newTime, setNewTime] = useState("12:00");
  const [recalcWake, setRecalcWake] = useState(state?.setup.wakeTime ?? "07:00");
  const [recalcBed, setRecalcBed] = useState(state?.setup.bedtime ?? "22:00");

  if (!state) return null;

  const slots = [...state.scheduleSlots].sort((a, b) => a.time.localeCompare(b.time));
  const week = weekDatesFor(todayISO());

  async function handle(action: Parameters<typeof dispatch>[0]) {
    const result = await dispatch(action);
    setError(result.ok ? null : result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="eyebrow">Your Routine</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Weekly Plan</h1>
            <p className="mt-2 text-ink-500">Your suggested routine — edit any meal time, or plan ahead for the week.</p>
          </div>
          <Link href={`/wellness/${token}/meal-planner/print`} target="_blank" className="btn-secondary !px-4 !py-2 text-xs">
            <Printer size={14} /> Print / Save as PDF
          </Link>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        )}

        {/* Schedule slot management */}
        <div className="mt-8 card p-6">
          <h2 className="font-display text-lg font-bold text-ink-900">Meal Times</h2>
          <div className="mt-4 space-y-2">
            {slots.map((slot) => (
              <div key={slot.id} className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5">
                <span className="flex-1 text-sm font-semibold text-ink-700">{slot.label}</span>
                <input
                  type="time"
                  value={slot.time}
                  onChange={(e) => handle({ type: "updateSlotTime", slotId: slot.id, time: e.target.value })}
                  className="rounded-lg border border-ink-900/15 bg-white px-2.5 py-1.5 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handle({ type: "deleteScheduleSlot", slotId: slot.id })}
                  aria-label={`Delete ${slot.label}`}
                  className="flex h-8 w-8 items-center justify-center rounded text-ink-400 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="e.g. Afternoon Snack"
              className="flex-1 rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="rounded-lg border border-ink-900/15 bg-white px-2.5 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={async () => {
                if (!newLabel.trim()) return;
                await handle({ type: "addScheduleSlot", label: newLabel, time: newTime });
                setNewLabel("");
              }}
              disabled={!newLabel.trim()}
              aria-label="Add meal time"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-950 text-white disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </div>

          <details className="mt-5 border-t border-ink-900/10 pt-4">
            <summary className="cursor-pointer text-sm font-semibold text-brand-700">Recalculate Suggested Times</summary>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <label className="block">
                <span className="text-xs font-semibold text-ink-600">Wake up</span>
                <input
                  type="time"
                  value={recalcWake}
                  onChange={(e) => setRecalcWake(e.target.value)}
                  className="mt-1 block rounded-lg border border-ink-900/15 bg-white px-2.5 py-1.5 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-ink-600">Bedtime</span>
                <input
                  type="time"
                  value={recalcBed}
                  onChange={(e) => setRecalcBed(e.target.value)}
                  className="mt-1 block rounded-lg border border-ink-900/15 bg-white px-2.5 py-1.5 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={() => handle({ type: "recalculateSchedule", wakeTime: recalcWake, bedtime: recalcBed, force: false })}
                className="btn-secondary !px-4 !py-2 text-xs"
              >
                Recalculate
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-400">
              This keeps any meal time you&apos;ve already edited by hand and only updates the rest.
            </p>
          </details>
        </div>

        {/* Reminder preferences — stored only, no real notifications are sent */}
        <div className="mt-6 card p-6">
          <h2 className="font-display text-lg font-bold text-ink-900">Reminders</h2>
          <p className="mt-1 text-sm text-ink-500">Save your reminder preference for when meal reminders become available.</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-ink-700">
              <input
                type="checkbox"
                checked={state.reminderPrefs.enabled}
                onChange={(e) =>
                  handle({
                    type: "saveReminderPrefs",
                    enabled: e.target.checked,
                    remindMinutesBefore: state.reminderPrefs.remindMinutesBefore,
                  })
                }
                className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
              />
              Remind me before each meal
            </label>
            <select
              value={state.reminderPrefs.remindMinutesBefore}
              disabled={!state.reminderPrefs.enabled}
              onChange={(e) =>
                handle({
                  type: "saveReminderPrefs",
                  enabled: state.reminderPrefs.enabled,
                  remindMinutesBefore: Number(e.target.value),
                })
              }
              className="rounded-lg border border-ink-900/15 bg-white px-2.5 py-1.5 text-sm text-ink-800 focus:border-brand-500 focus:outline-none disabled:opacity-50"
            >
              {[5, 10, 15, 30, 60].map((m) => (
                <option key={m} value={m}>
                  {m} minutes before
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 7-day grid */}
        <div className="mt-8 overflow-x-auto">
          <div className="grid min-w-[700px] grid-cols-7 gap-3">
            {week.map((date) => {
              const dayMeals = state.mealsByDate[date] ?? {};
              const isToday = date === todayISO();
              return (
                <div
                  key={date}
                  className={`card p-3.5 ${isToday ? "border-brand-400 bg-brand-50/40" : ""}`}
                >
                  <p className="text-xs font-bold text-ink-700">{formatDateLong(date).split(",")[0]}</p>
                  <p className="text-[11px] text-ink-400">{formatDateLong(date).split(", ")[1]}</p>
                  <div className="mt-2 space-y-1.5">
                    {slots.map((slot) => {
                      const entry = dayMeals[slot.id];
                      return (
                        <div key={slot.id} className="text-[11px]">
                          <span className="font-semibold text-ink-500">{formatTime12h(slot.time)}</span>{" "}
                          <span className={entry?.status === "completed" ? "text-ink-400 line-through" : "text-ink-700"}>
                            {entry?.mealName || "—"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
