import { notFound } from "next/navigation";
import { requireOrder, getEntitledProducts } from "@/lib/readerAuth";
import { getReaderProgress } from "@/lib/readerProgress";
import { buildMetadata } from "@/lib/seo";
import ReaderShell from "@/components/reader/ReaderShell";
import LibraryGrid from "@/components/reader/LibraryGrid";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "HealthyGuide Reader | Natural Wellness Library",
  description: "Read, plan, and track the guides you own, in one place.",
  path: "/reader",
  noindex: true,
});

export default async function ReaderLibraryPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  const products = getEntitledProducts(order);
  const entries = await Promise.all(
    products.map(async (product) => ({
      product,
      progress: await getReaderProgress(token, product.slug),
    }))
  );

  return (
    <ReaderShell token={token}>
      <div className="section-pad">
        <div className="container-page">
          <span className="eyebrow">My Library</span>
          <h1 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Welcome back</h1>
          <p className="mt-2 max-w-xl text-ink-600">
            Everything you own, ready to read, plan, and track in one place.
          </p>

          <div className="mt-10">
            <LibraryGrid token={token} entries={entries} />
          </div>
        </div>
      </div>
    </ReaderShell>
  );
}
