import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import ReaderShell from "@/components/reader/ReaderShell";
import ThirtyDaySystem from "@/components/reader/ThirtyDaySystem";

export const dynamic = "force-dynamic";

export default async function ReaderSystemPage({
  params,
}: {
  params: Promise<{ token: string; slug: string }>;
}) {
  const { token, slug } = await params;
  const result = await requireEntitledProduct(token, slug);
  if (!result || result.product.isBonus) notFound();

  return (
    <ReaderShell token={token}>
      <ThirtyDaySystem token={token} product={result.product} />
    </ReaderShell>
  );
}
