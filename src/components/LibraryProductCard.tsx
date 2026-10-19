import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCover from "./ProductCover";
import PriceBadge from "./PriceBadge";

/**
 * Catalogue-grid card scoped to /library only. Deliberately separate from
 * ProductCard (which carries an in-progress, unapproved offer-pricing
 * change elsewhere in this tree) — this component reads product.price /
 * product.compareAtPrice directly, never through the offer layer.
 */
export default function LibraryProductCard({ product }: { product: Product }) {
  const viewLabel = product.category === "baking" ? "View Ebook" : "View Guide";
  const checkoutHref = product.isBonus ? "/checkout" : `/checkout/${product.slug}`;

  return (
    <div className="card card-hover flex h-full flex-col overflow-hidden">
      <div className="relative">
        <ProductCover product={product} className="aspect-[3/4] w-full !rounded-none" />
        {product.isBonus && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-950 shadow">
            Free Bonus
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
          {product.categoryLabel}
        </span>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink-950">
          {product.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {product.subtitle}
        </p>

        <div className="mt-auto pt-4">
          <div className="border-t border-ink-900/[0.06] pt-4">
            {product.price === null ? (
              <span className="font-display text-lg font-bold text-ink-950">Price coming soon</span>
            ) : product.price === 0 ? (
              <span className="font-display text-lg font-bold text-ink-950">Free</span>
            ) : (
              <PriceBadge price={product.price} compareAtPrice={product.compareAtPrice} />
            )}

            <div className="mt-3 flex items-center gap-2.5">
              <Link
                href={`/library/${product.slug}`}
                className="btn-gold flex-1 !px-4 !py-2.5 text-sm"
              >
                {viewLabel}
              </Link>
              <Link
                href={checkoutHref}
                aria-label={`Get ${product.title}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-900 text-white transition-colors hover:bg-brand-800"
              >
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
