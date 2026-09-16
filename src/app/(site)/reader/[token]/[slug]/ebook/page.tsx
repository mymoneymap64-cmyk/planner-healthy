import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import ReaderShell from "@/components/reader/ReaderShell";
import EbookReader from "@/components/reader/EbookReader";

export const dynamic = "force-dynamic";

export default async function ReaderEbookPage({
  params,
}: {
  params: Promise<{ token: string; slug: string }>;
}) {
  const { token, slug } = await params;
  const result = await requireEntitledProduct(token, slug);
  if (!result || !result.product.ebookPdf) notFound();

  return (
    <ReaderShell token={token}>
      <EbookReader token={token} product={result.product} />
    </ReaderShell>
  );
}
