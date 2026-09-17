import { notFound } from "next/navigation";
import { requireOrder, getEntitledProducts } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import FavoritesPageClient from "@/components/wellness-dashboard/FavoritesPageClient";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Favorites | HealthyGuide Wellness System",
  description: "Guides, checklists, and notes you've saved.",
  path: "/wellness",
  noindex: true,
});

export default async function FavoritesPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  const products = getEntitledProducts(order);

  return (
    <DashboardShell token={token}>
      <FavoritesPageClient token={token} products={products} />
    </DashboardShell>
  );
}
