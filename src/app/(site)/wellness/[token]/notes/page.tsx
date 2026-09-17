import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import NotesPageClient from "@/components/wellness-dashboard/NotesPageClient";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Notes & Journal | HealthyGuide Wellness System",
  description: "A calm, private place for your reflections and reminders.",
  path: "/wellness",
  noindex: true,
});

export default async function NotesPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  return (
    <DashboardShell token={token}>
      <NotesPageClient token={token} />
    </DashboardShell>
  );
}
