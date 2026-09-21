import { notFound } from "next/navigation";
import { requireOrder, getEntitledProducts } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import HomeDashboard from "@/components/wellness-dashboard/HomeDashboard";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "HealthyGuide Wellness System | Natural Wellness Library",
  description: "Your daily wellness dashboard — checklists, progress, and journal in one place.",
  path: "/wellness",
  noindex: true,
});

export default async function WellnessHomePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  const products = getEntitledProducts(order);

  return (
    <DashboardShell token={token}>
      <HomeDashboard token={token} products={products} />
    </DashboardShell>
  );
}
