import { Check, ShoppingCart, TrendingUp } from "lucide-react";
import ProgressRing from "@/components/wellness-dashboard/ProgressRing";

const TODAY_ROWS = [
  { time: "8:00 AM", label: "Breakfast", meal: "Oatmeal + berries", done: true },
  { time: "1:00 PM", label: "Lunch", meal: "Add meal...", done: false },
  { time: "4:30 PM", label: "Snack", meal: "Add meal...", done: false },
  { time: "7:30 PM", label: "Dinner", meal: "Add meal...", done: false },
];

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const GROCERY_ITEMS = ["Spinach", "Greek yogurt", "Eggs"];
const PROGRESS_BARS = [30, 55, 40, 70, 60, 85, 75, 50, 65, 80, 90, 70];

/**
 * Static, non-interactive marketing preview of the real Meal Planner UI —
 * reuses ProgressRing (the actual dashboard component) and the same visual
 * language as TodayView, but has no live state, dispatch, or network calls.
 * Purely illustrative; never touches /api/wellness-meal-planner.
 */
export default function MealPlannerPreview() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-600">Today&apos;s Plan</p>
            <p className="mt-1 text-sm text-ink-500">3 of 4 meals completed today</p>
          </div>
          <ProgressRing percent={75} size={64} label="Today" />
        </div>

        <div className="mt-5 space-y-2.5">
          {TODAY_ROWS.map((row) => (
            <div key={row.label} className="flex items-center gap-3 rounded-lg border border-ink-900/10 bg-white px-3.5 py-2.5">
              <span className="w-16 shrink-0 text-xs font-bold text-ink-600">{row.time}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-600">{row.label}</p>
                <p className={`text-sm ${row.done ? "text-ink-400 line-through" : "text-ink-400"}`}>{row.meal}</p>
              </div>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                  row.done ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 text-transparent"
                }`}
              >
                <Check size={13} strokeWidth={3} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-400">Weekly Plan</p>
          <div className="mt-3 flex justify-between">
            {WEEK_DAYS.map((d, i) => (
              <span
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 3 ? "bg-brand-600 text-white" : "bg-ink-900/5 text-ink-500"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-400">
            <ShoppingCart size={13} /> Grocery List
          </p>
          <div className="mt-3 space-y-1.5">
            {GROCERY_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-ink-600">
                <span className="h-3.5 w-3.5 shrink-0 rounded border border-ink-300" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-400">
            <TrendingUp size={13} /> 30-Day Progress
          </p>
          <div className="mt-3 flex h-10 items-end gap-[3px]">
            {PROGRESS_BARS.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-brand-600" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-ink-400">
        A preview of your Wellness Dashboard — available right after checkout.
      </p>
    </div>
  );
}
