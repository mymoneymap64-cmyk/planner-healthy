import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import { getReaderProgress } from "@/lib/readerProgress";
import ReaderShell from "@/components/reader/ReaderShell";
import ProductDashboard from "@/components/reader/ProductDashboard";

export const dynamic = "force-dynamic";

export default async function ReaderProductPage({
  params,
}: {
  params: Promise<{ token: string; slug: string }>;
}) {
  const { token, slug } = await params;
  const result = await requireEntitledProduct(token, slug);
  if (!result) notFound();

  const progress = await getReaderProgress(token, slug);

  return (
    <ReaderShell token={token}>
      <ProductDashboard token={token} product={result.product} progress={progress} />
    </ReaderShell>
  );
}
