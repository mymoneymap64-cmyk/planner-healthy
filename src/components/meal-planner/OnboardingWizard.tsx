"use client";

import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useMealPlanner } from "./useMealPlanner";
import {
  GOAL_LABELS,
  MealPlannerGoal,
  formatTime12h,
  generateSuggestedSchedule,
} from "@/lib/mealPlanner";

const GOALS = Object.keys(GOAL_LABELS) as MealPlannerGoal[];

function defaultTimeFor(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

export default function OnboardingWizard({
  dispatch,
}: {
  dispatch: ReturnType<typeof useMealPlanner>["dispatch"];
}) {
  const [step, setStep] = useState(0);
  const [wakeTime, setWakeTime] = useState(defaultTimeFor(7));
  const [bedtime, setBedtime] = useState(defaultTimeFor(22));
  const [numberOfMeals, setNumberOfMeals] = useState<2 | 3 | 4>(3);
  const [numberOfSnacks, setNumberOfSnacks] = useState<0 | 1 | 2>(1);
  const [goals, setGoals] = useState<MealPlannerGoal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const suggested = useMemo(
    () => generateSuggestedSchedule(wakeTime, bedtime, numberOfMeals, numberOfSnacks),
    [wakeTime, bedtime, numberOfMeals, numberOfSnacks]
  );
  const [editedTimes, setEditedTimes] = useState<string[] | null>(null);
  const times = editedTimes && editedTimes.length === suggested.length ? editedTimes : suggested.map((s) => s.time);

  function goTo(next: number) {
    setError(null);
    setStep(next);
  }

  function toggleGoal(goal: MealPlannerGoal) {
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  }

  async function finish() {
    setSaving(true);
    setError(null);
    const result = await dispatch({
      type: "saveSetup",
      wakeTime,
      bedtime,
      numberOfMeals,
      numberOfSnacks,
      goals,
      slots: suggested.map((s, i) => ({ label: s.label, time: times[i] })),
    });
    setSaving(false);
    if (!result.ok) setError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="section-pad !pt-10">
      <div className="container-page">
        <div className="mx-auto max-w-lg">
          {step > 0 && (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className="mb-4 flex items-center gap-1 text-sm font-semibold text-ink-500 hover:text-ink-800"
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}

          <div className="mb-6 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-brand-600" : "bg-ink-900/10"}`} />
            ))}
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
          )}

          {step === 0 && (
            <div className="card p-7 text-center">
              <span className="eyebrow">Meal Planner</span>
              <h1 className="mt-3 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                Build Your Healthy Eating Routine
              </h1>
              <p className="mt-3 text-ink-500">Create a simple daily meal schedule that fits your day.</p>
              <button type="button" onClick={() => goTo(1)} className="btn-gold mt-6 w-full justify-center">
                Get Started
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="card p-7">
              <h2 className="font-display text-xl font-bold text-ink-900">Your Day</h2>
              <div className="mt-5 space-y-5">
                <label className="block">
                  <span className="text-sm font-semibold text-ink-700">What time do you usually wake up?</span>
                  <input
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink-700">What time do you usually go to bed?</span>
                  <input
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
                  />
                </label>
              </div>
              <button type="button" onClick={() => goTo(2)} className="btn-gold mt-6 w-full justify-center">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="card p-7">
              <h2 className="font-display text-xl font-bold text-ink-900">Meal Routine</h2>
              <div className="mt-5 space-y-5">
                <div>
                  <span className="text-sm font-semibold text-ink-700">How many main meals do you usually have?</span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[2, 3, 4].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNumberOfMeals(n as 2 | 3 | 4)}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition-colors ${
                          numberOfMeals === n
                            ? "border-brand-600 bg-brand-50 text-brand-800"
                            : "border-ink-900/15 text-ink-600 hover:bg-ink-900/5"
                        }`}
                      >
                        {n} meals
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-semibold text-ink-700">Do you usually include snacks?</span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      { value: 0, label: "No snacks" },
                      { value: 1, label: "1 snack" },
                      { value: 2, label: "2 snacks" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setNumberOfSnacks(opt.value as 0 | 1 | 2)}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition-colors ${
                          numberOfSnacks === opt.value
                            ? "border-brand-600 bg-brand-50 text-brand-800"
                            : "border-ink-900/15 text-ink-600 hover:bg-ink-900/5"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => goTo(3)} className="btn-gold mt-6 w-full justify-center">
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="card p-7">
              <h2 className="font-display text-xl font-bold text-ink-900">Your Goal</h2>
              <p className="mt-1.5 text-sm text-ink-500">What would you like to improve? Pick as many as you like.</p>
              <div className="mt-5 space-y-2">
                {GOALS.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-sm font-semibold transition-colors ${
                      goals.includes(goal)
                        ? "border-brand-600 bg-brand-50 text-brand-800"
                        : "border-ink-900/15 text-ink-600 hover:bg-ink-900/5"
                    }`}
                  >
                    {GOAL_LABELS[goal]}
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                        goals.includes(goal) ? "border-brand-600 bg-brand-600" : "border-ink-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => goTo(4)} className="btn-gold mt-6 w-full justify-center">
                Continue
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="card p-7">
              <h2 className="font-display text-xl font-bold text-ink-900">Preferred Meal Times</h2>
              <p className="mt-1.5 text-sm text-ink-500">
                This is a suggested routine based on your day — edit any time to make it yours.
              </p>
              <div className="mt-5 space-y-3">
                {suggested.map((slot, i) => (
                  <div key={`${slot.label}-${i}`} className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-ink-700">{slot.label}</span>
                    <input
                      type="time"
                      value={times[i]}
                      onChange={(e) => {
                        const next = [...times];
                        next[i] = e.target.value;
                        setEditedTimes(next);
                      }}
                      className="rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-ink-400">
                This tool is for general wellness and meal-planning purposes and is not medical advice.
              </p>
              <button
                type="button"
                onClick={finish}
                disabled={saving}
                className="btn-gold mt-6 w-full justify-center disabled:opacity-60"
              >
                {saving ? "Creating..." : "Create My Routine"}
              </button>
            </div>
          )}

          {step === 4 && suggested.length > 0 && (
            <p className="mt-4 text-center text-xs text-ink-400">
              Example: {suggested[0].label} around {formatTime12h(times[0])}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
