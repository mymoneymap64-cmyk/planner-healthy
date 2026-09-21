import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import DailyPlanClient from "@/components/wellness-dashboard/DailyPlanClient";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Daily Plan | HealthyGuide Wellness System",
  description: "Your morning, afternoon, and evening wellness routine.",
  path: "/wellness/plan",
  noindex: true,
});

export default async function DailyPlanPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  return (
    <DashboardShell token={token}>
      <DailyPlanClient token={token} />
    </DashboardShell>
  );
}
