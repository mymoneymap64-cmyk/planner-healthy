import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import DigitalDetoxClient from "@/components/digital-detox/DigitalDetoxClient";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "7-Day Digital Detox | HealthyGuide Wellness System",
  description: "A 7-day offline reset — small daily actions to help you step away from the screen.",
  path: "/wellness/digital-detox",
  noindex: true,
});

export default async function DigitalDetoxPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  return (
    <DashboardShell token={token}>
      <DigitalDetoxClient token={token} />
    </DashboardShell>
  );
}
