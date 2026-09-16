import Link from "next/link";
import { Product } from "@/lib/types";
import ProductCover from "@/components/ProductCover";
import ProgressBar from "@/components/reader/ProgressBar";

export type WellnessLibraryEntry = {
  product: Product;
  ebookPercent: number | null;
  checklistPercent: number | null;
};

export default function WellnessProductCard({ token, entry }: { token: string; entry: WellnessLibraryEntry }) {
  const { product, ebookPercent, checklistPercent } = entry;

  return (
    <div className="card flex flex-col overflow-hidden p-4 sm:p-5">
      <ProductCover product={product} className="aspect-[3/4] w-full" />
      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
          {product.categoryLabel}
        </span>
        <h3 className="mt-1 font-display text-base font-bold text-ink-950">{product.title}</h3>

        <div className="mt-3 space-y-2.5">
          {ebookPercent !== null && <ProgressBar value={ebookPercent} label="Ebook progress" />}
          {checklistPercent !== null && <ProgressBar value={checklistPercent} label="Checklist" />}
        </div>

        <Link
          href={`/wellness/${token}/${product.slug}`}
          className="btn-gold mt-4 w-full justify-center"
        >
          Open Workspace
        </Link>
      </div>
    </div>
  );
}
