import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import ReaderShell from "@/components/reader/ReaderShell";
import PlannerViewer from "@/components/reader/PlannerViewer";

export const dynamic = "force-dynamic";

export default async function ReaderPlannerPage({
  params,
}: {
  params: Promise<{ token: string; slug: string }>;
}) {
  const { token, slug } = await params;
  const result = await requireEntitledProduct(token, slug);
  if (!result || !result.product.plannerPdf) notFound();

  return (
    <ReaderShell token={token}>
      <PlannerViewer token={token} product={result.product} />
    </ReaderShell>
  );
}
