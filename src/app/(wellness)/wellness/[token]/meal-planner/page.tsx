import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import MealPlannerClient from "@/components/meal-planner/MealPlannerClient";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Meal Planner | HealthyGuide Wellness System",
  description: "Plan your meals, build a daily eating routine, and keep a grocery list in one place.",
  path: "/wellness/meal-planner",
  noindex: true,
});

export default async function MealPlannerPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  return (
    <DashboardShell token={token}>
      <MealPlannerClient token={token} />
    </DashboardShell>
  );
}
