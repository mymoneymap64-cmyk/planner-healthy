import { notFound } from "next/navigation";
import { requireEntitledProduct } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import ReaderShell from "@/components/reader/ReaderShell";
import DayDetail from "@/components/reader/DayDetail";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Daily Plan | HealthyGuide Reader",
  description: "Your day-by-day plan.",
  path: "/reader",
  noindex: true,
});

export default async function ReaderDayPage({
  params,
}: {
  params: Promise<{ token: string; slug: string; day: string }>;
}) {
  const { token, slug, day } = await params;
  const result = await requireEntitledProduct(token, slug);
  const dayNumber = Number(day);

  if (!result || result.product.isBonus || !Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 30) {
    notFound();
  }

  return (
    <ReaderShell token={token}>
      <DayDetail token={token} product={result.product} day={dayNumber} />
    </ReaderShell>
  );
}
