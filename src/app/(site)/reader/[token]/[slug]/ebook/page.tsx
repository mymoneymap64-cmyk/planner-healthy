import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import ReaderShell from "@/components/reader/ReaderShell";
import EbookReader from "@/components/reader/EbookReader";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Ebook | HealthyGuide Reader",
  description: "Read your guide.",
  path: "/reader",
  noindex: true,
});

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
