import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import ChecklistDetailClient from "@/components/wellness-dashboard/ChecklistDetailClient";

export const dynamic = "force-dynamic";

export default async function ChecklistDetailPage({
  params,
}: {
  params: Promise<{ token: string; id: string }>;
}) {
  const { token, id } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  return (
    <DashboardShell token={token}>
      <ChecklistDetailClient token={token} checklistId={id} />
    </DashboardShell>
  );
}
