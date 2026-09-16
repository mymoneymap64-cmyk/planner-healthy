import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import { getWellnessTools } from "@/data/wellnessTools";
import WellnessShell from "@/components/wellness/WellnessShell";
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
    <WellnessShell token={token}>
      <ProductWorkspace token={token} product={result.product} tools={tools} />
    </WellnessShell>
  );
}
