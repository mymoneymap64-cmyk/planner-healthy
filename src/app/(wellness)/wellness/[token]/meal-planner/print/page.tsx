import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import { getMealPlannerState } from "@/lib/mealPlannerStore";
import { formatDateLong, formatTime12h, weekDatesFor, todayISO } from "@/lib/mealPlanner";
import PrintButton from "@/components/meal-planner/PrintButton";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Print Meal Plan | HealthyGuide Wellness System",
  description: "A printable copy of your weekly meal plan.",
  path: "/wellness/meal-planner/print",
  noindex: true,
});

export default async function MealPlannerPrintPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  const state = await getMealPlannerState(token);
  const slots = [...state.scheduleSlots].sort((a, b) => a.time.localeCompare(b.time));
  const week = weekDatesFor(todayISO());

  return (
    <div className="mx-auto max-w-3xl p-8 print:p-0">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <h1 className="font-display text-xl font-bold text-ink-900">Weekly Meal Plan</h1>
        <PrintButton />
      </div>

      <div className="hidden text-center print:mb-6 print:block">
        <h1 className="text-2xl font-bold">Weekly Meal Plan</h1>
      </div>

      {slots.length === 0 ? (
        <p className="text-sm text-ink-500">No meal times set up yet.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-ink-900/15 bg-ink-900/5 p-2 text-left">Time</th>
              <th className="border border-ink-900/15 bg-ink-900/5 p-2 text-left">Meal</th>
              {week.map((date) => (
                <th key={date} className="border border-ink-900/15 bg-ink-900/5 p-2 text-left">
                  {formatDateLong(date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.id}>
                <td className="border border-ink-900/15 p-2 font-semibold">{formatTime12h(slot.time)}</td>
                <td className="border border-ink-900/15 p-2">{slot.label}</td>
                {week.map((date) => (
                  <td key={date} className="border border-ink-900/15 p-2">
                    {state.mealsByDate[date]?.[slot.id]?.mealName || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="mt-6 text-xs text-ink-400">
        This tool is for general wellness and meal-planning purposes and is not medical advice.
      </p>
    </div>
  );
}
