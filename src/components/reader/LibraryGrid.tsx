import Link from "next/link";
import { Product } from "@/lib/types";
import { ReaderProgress } from "@/lib/readerProgress";
import { getReaderCapabilities } from "@/data/readerContent";
import ProductCover from "@/components/ProductCover";
import ProgressBar from "@/components/reader/ProgressBar";

export type LibraryEntry = { product: Product; progress: ReaderProgress };

export default function LibraryGrid({ token, entries }: { token: string; entries: LibraryEntry[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(({ product, progress }) => {
        const capabilities = getReaderCapabilities(product);
        const percent = product.pageCount ? Math.min(100, (progress.ebookPage / product.pageCount) * 100) : 0;

        return (
          <div key={product.slug} className="card flex flex-col overflow-hidden p-4 sm:p-5">
            <ProductCover product={product} className="aspect-[3/4] w-full" />
            <div className="mt-4 flex flex-1 flex-col">
              <h3 className="font-display text-base font-bold text-ink-950">{product.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-ink-500">{product.description}</p>

              {capabilities.ebookAvailable && (
                <div className="mt-3">
                  <ProgressBar value={percent} label="Reading progress" />
                </div>
              )}

              <div className="mt-4 flex flex-col gap-2">
                {capabilities.ebookAvailable && (
                  <Link
                    href={`/reader/${token}/${product.slug}/ebook`}
                    className="rounded-md bg-ink-950 px-3 py-2 text-center text-xs font-bold text-white hover:bg-brand-800"
                  >
                    Read Ebook
                  </Link>
                )}
                {!capabilities.plannerIncludedInEbook && capabilities.plannerAvailable && (
                  <Link
                    href={`/reader/${token}/${product.slug}/planner`}
                    className="rounded-md border border-ink-900/15 px-3 py-2 text-center text-xs font-bold text-ink-800 hover:border-brand-400"
                  >
                    Open Planner
                  </Link>
                )}
                {!product.isBonus && (
                  <Link
                    href={`/reader/${token}/${product.slug}/system`}
                    className="rounded-md border border-ink-900/15 px-3 py-2 text-center text-xs font-bold text-ink-800 hover:border-brand-400"
                  >
                    Start 30-Day System
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
