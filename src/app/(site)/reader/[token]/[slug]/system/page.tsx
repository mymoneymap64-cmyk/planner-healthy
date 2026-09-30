import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import { getReaderCapabilities } from "@/data/readerContent";
import { buildMetadata } from "@/lib/seo";
import ReaderShell from "@/components/reader/ReaderShell";
import ThirtyDaySystem from "@/components/reader/ThirtyDaySystem";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "30-Day System | HealthyGuide Reader",
  description: "Your matching 30-day system.",
  path: "/reader",
  noindex: true,
});

export default async function ReaderSystemPage({
  params,
}: {
  params: Promise<{ token: string; slug: string }>;
}) {
  const { token, slug } = await params;
  const result = await requireEntitledProduct(token, slug);
  if (!result) notFound();

  // A 30-day system only exists if this product actually has one (as a
  // separate PDF or built into the ebook) — not just "isn't a free bonus".
  // Standalone products like the cookbook have neither, same as bonuses.
  const capabilities = getReaderCapabilities(result.product);
  if (!capabilities.systemPdfAvailable && !capabilities.systemIncludedInEbook) notFound();

  return (
    <ReaderShell token={token}>
      <ThirtyDaySystem token={token} product={result.product} />
    </ReaderShell>
  );
}
