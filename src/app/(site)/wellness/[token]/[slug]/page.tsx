import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import { getWellnessTools } from "@/data/wellnessTools";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import ProductWorkspace from "@/components/wellness/ProductWorkspace";

export const dynamic = "force-dynamic";

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
