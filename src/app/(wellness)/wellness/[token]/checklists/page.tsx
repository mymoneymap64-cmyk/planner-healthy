import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import ChecklistsPageClient from "@/components/wellness-dashboard/ChecklistsPageClient";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Checklists | HealthyGuide Wellness System",
  description: "Reusable wellness checklists you can check off, reset, and customize.",
  path: "/wellness/checklists",
  noindex: true,
});

export default async function ChecklistsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  return (
    <DashboardShell token={token}>
      <ChecklistsPageClient token={token} />
    </DashboardShell>
  );
}
