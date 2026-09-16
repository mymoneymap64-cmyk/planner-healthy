import Link from "next/link";
import { BookOpen, Calendar, ClipboardList } from "lucide-react";
import { Product } from "@/lib/types";
import { ReaderProgress } from "@/lib/readerProgress";
import { getReaderCapabilities } from "@/data/readerContent";
import ProductCover from "@/components/ProductCover";
import ProgressBar from "@/components/reader/ProgressBar";

export default function ProductDashboard({
  token,
  product,
  progress,
}: {
  token: string;
  product: Product;
  progress: ReaderProgress;
}) {
  const capabilities = getReaderCapabilities(product);
  const ebookPercent = product.pageCount ? Math.min(100, (progress.ebookPage / product.pageCount) * 100) : 0;
  const systemPercent = (progress.completedDays.length / 30) * 100;

  return (
    <div className="section-pad">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="w-28 shrink-0 sm:w-32">
            <ProductCover product={product} className="aspect-[3/4] w-full" />
          </div>
          <div>
            <span className="eyebrow">{product.categoryLabel}</span>
            <h1 className="mt-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{product.title}</h1>
            <p className="mt-1.5 max-w-lg text-sm text-ink-600">{product.subtitle}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <div className="card flex flex-col p-5">
            <BookOpen size={20} className="text-brand-700" />
            <h2 className="mt-3 font-display text-lg font-bold text-ink-900">📖 Ebook</h2>
            {capabilities.ebookAvailable ? (
              <>
                <p className="mt-1 text-xs text-ink-500">
                  Page {progress.ebookPage} of {product.pageCount ?? "—"}
                </p>
                <div className="mt-3">
                  <ProgressBar value={ebookPercent} />
                </div>
                <Link
                  href={`/reader/${token}/${product.slug}/ebook`}
                  className="btn-gold mt-4 w-full justify-center"
                >
                  {progress.ebookPage > 1 ? "Continue Reading" : "Read Ebook"}
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm text-ink-400">Not available yet.</p>
            )}
          </div>

          <div className="card flex flex-col p-5">
            <ClipboardList size={20} className="text-brand-700" />
            <h2 className="mt-3 font-display text-lg font-bold text-ink-900">📝 Planner</h2>
            {capabilities.plannerIncludedInEbook ? (
              <p className="mt-3 text-sm text-ink-500">Included inside the ebook.</p>
            ) : capabilities.plannerAvailable ? (
              <>
                <p className="mt-1 text-xs text-ink-500">Page {progress.plannerPage}</p>
                <Link
                  href={`/reader/${token}/${product.slug}/planner`}
                  className="btn-gold mt-4 w-full justify-center"
                >
                  Open Planner
                </Link>
              </>
            ) : (
              <p className="mt-3 text-sm text-ink-400">Not available yet.</p>
            )}
          </div>

          {!product.isBonus && (
            <div className="card flex flex-col p-5">
              <Calendar size={20} className="text-brand-700" />
              <h2 className="mt-3 font-display text-lg font-bold text-ink-900">📅 30-Day System</h2>
              <p className="mt-1 text-xs text-ink-500">{progress.completedDays.length} / 30 completed</p>
              <div className="mt-3">
                <ProgressBar value={systemPercent} />
              </div>
              <Link href={`/reader/${token}/${product.slug}/system`} className="btn-gold mt-4 w-full justify-center">
                {progress.completedDays.length > 0 ? "Continue System" : "Start 30-Day System"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
