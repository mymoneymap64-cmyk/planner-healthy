import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCover from "./ProductCover";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card card-hover flex flex-col overflow-hidden p-4 sm:p-5">
      <div className="relative">
        <ProductCover product={product} className="aspect-[3/4] w-full" />
        {product.isBonus && (
          <span className="absolute left-2 top-2 rounded-full bg-gold-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-950 shadow">
            Free Bonus
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
          {product.categoryLabel}
        </span>
        <h3 className="mt-1 font-display text-lg font-bold text-ink-950">{product.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{product.description}</p>

        {product.benefits.length > 0 && (
          <p className="mt-2 text-xs font-medium text-ink-600">{product.benefits[0]}</p>
        )}

        {!product.isBonus && (
          <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-ink-400">
            Ebook + Planner + 30-Day System
          </p>
        )}

        <div className="mt-4 border-t border-ink-900/[0.06] pt-4">
          {product.price === null ? (
            <span className="font-display text-lg font-bold text-ink-950">Price coming soon</span>
          ) : product.price === 0 ? (
            <span className="font-display text-lg font-bold text-ink-950">Free</span>
          ) : (
            <div className="rounded-lg border border-gold-400/25 bg-gold-50/60 px-3 py-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-wide text-gold-700">Launch Offer</p>
                {product.compareAtPrice != null && product.compareAtPrice > product.price && (
                  <span className="rounded-full bg-ink-950 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-gold-300">
                    Save {Math.round(100 - (product.price / product.compareAtPrice) * 100)}%
                  </span>
                )}
              </div>
              <div className="mt-1.5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-ink-500">Launch Price</p>
                  <span className="font-display text-2xl font-black leading-none text-ink-950">
                    ${product.price}
                  </span>
                </div>
                {product.compareAtPrice != null && (
                  <div className="pb-0.5 text-right">
                    <p className="text-[9px] font-bold uppercase tracking-wide text-ink-400">Guide Value</p>
                    <span className="text-sm font-semibold text-ink-400 line-through decoration-ink-300">
                      ${product.compareAtPrice}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <Link
              href={`/library/${product.slug}`}
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              <Eye size={14} /> View Guide
            </Link>
            <Link
              href={product.isBonus ? "/checkout" : `/checkout/${product.slug}`}
              className="inline-flex items-center gap-1 rounded-md bg-ink-950 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-800"
            >
              Get Access <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
