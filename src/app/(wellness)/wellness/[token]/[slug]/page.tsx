import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import { getWellnessTools } from "@/data/wellnessTools";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import ProductWorkspace from "@/components/wellness/ProductWorkspace";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Your Wellness Tools | HealthyGuide Wellness System",
  description: "Checklists and tools for this guide.",
  path: "/wellness",
  noindex: true,
});

export default async function WellnessProductPage({
  params,
}: {
  params: Promise<{ token: string; slug: string }>;
}) {
  const { token, slug } = await params;
  const result = await requireEntitledProduct(token, slug);
  if (!result) notFound();

  const tools = getWellnessTools(slug);

  return (
    <DashboardShell token={token}>
      <ProductWorkspace token={token} product={result.product} tools={tools} />
    </DashboardShell>
  );
}
