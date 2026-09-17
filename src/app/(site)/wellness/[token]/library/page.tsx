import { notFound } from "next/navigation";
import { requireOrder, getEntitledProducts } from "@/lib/readerAuth";
import { getReaderProgress } from "@/lib/readerProgress";
import { getChecklistState } from "@/lib/wellness";
import { getChecklistItemIds } from "@/data/wellnessTools";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import LibraryPageClient from "@/components/wellness-dashboard/LibraryPageClient";
import { WellnessLibraryEntry } from "@/components/wellness/WellnessProductCard";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "My Library | HealthyGuide Wellness System",
  description: "Every guide included in your purchase, in one organized space.",
  path: "/wellness",
  noindex: true,
});

export default async function WellnessLibraryPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  const products = getEntitledProducts(order);
  const entries: WellnessLibraryEntry[] = await Promise.all(
    products.map(async (product) => {
      const [progress, checklist] = await Promise.all([
        getReaderProgress(token, product.slug),
        getChecklistState(token, product.slug),
      ]);

      const checklistIds = getChecklistItemIds(product.slug);
      const checklistCompleted = checklistIds.filter((id) => checklist[id]).length;

      return {
        product,
        ebookPercent:
          product.ebookPdf && product.pageCount
            ? Math.min(100, (progress.ebookPage / product.pageCount) * 100)
            : null,
        checklistPercent: checklistIds.length > 0 ? (checklistCompleted / checklistIds.length) * 100 : null,
      };
    })
  );

  return (
    <DashboardShell token={token}>
      <LibraryPageClient token={token} entries={entries} />
    </DashboardShell>
  );
}
