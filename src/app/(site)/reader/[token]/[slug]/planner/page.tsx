import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import ReaderShell from "@/components/reader/ReaderShell";
import PlannerViewer from "@/components/reader/PlannerViewer";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Planner | HealthyGuide Reader",
  description: "Your matching planner.",
  path: "/reader",
  noindex: true,
});

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
