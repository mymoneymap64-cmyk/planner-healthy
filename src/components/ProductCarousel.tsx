"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCover from "./ProductCover";
import PriceBadge from "./PriceBadge";

/**
 * Dependency-free horizontal carousel (native scroll-snap + buttons that
 * scroll by exactly one card's measured width). No carousel library exists
 * in this project yet, and this is simple enough not to need one.
 */
export default function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  function scrollByOneCard(direction: "prev" | "next") {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-carousel-card]") as HTMLElement | null;
    const amount = (card?.offsetWidth ?? el.clientWidth * 0.8) + 20; // card width + gap
    el.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 motion-reduce:scroll-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => {
          const href =
            product.price !== null && product.price > 0 ? `/checkout/${product.slug}` : "/checkout";
          return (
            <div
              key={product.slug}
              data-carousel-card
              className="w-[82%] shrink-0 snap-start md:w-[46%] xl:w-[23%]"
            >
              <div className="card flex h-full flex-col overflow-hidden p-4 transition-shadow hover:shadow-lift sm:p-5">
                <Link href={`/library/${product.slug}`} className="group block">
                  <ProductCover
                    product={product}
                    className="aspect-[3/4] w-full transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </Link>

                <div className="mt-4 flex flex-1 flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
                    {product.categoryLabel}
                  </span>
                  <Link href={`/library/${product.slug}`} className="hover:text-brand-700">
                    <h3 className="mt-1 font-display text-lg font-bold text-ink-950">{product.title}</h3>
                  </Link>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-500">
                    {product.subtitle}
                  </p>

                  <div className="mt-4 border-t border-ink-900/[0.06] pt-4">
                    {product.price !== null && product.price > 0 ? (
                      <PriceBadge price={product.price} compareAtPrice={product.compareAtPrice} showOfferHeader={false} />
                    ) : (
                      <span className="font-display text-lg font-bold text-ink-950">Price coming soon</span>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <Link
                        href={`/library/${product.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800"
                      >
                        <Eye size={14} /> View Guide
                      </Link>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-1 rounded-md bg-ink-950 px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-800"
                      >
                        Get the Guide <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 hidden items-center justify-center gap-3 sm:flex">
        <button
          type="button"
          onClick={() => scrollByOneCard("prev")}
          disabled={atStart}
          aria-label="Previous guides"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 bg-white text-ink-700 transition-colors hover:bg-brand-50 disabled:opacity-30"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollByOneCard("next")}
          disabled={atEnd}
          aria-label="Next guides"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 bg-white text-ink-700 transition-colors hover:bg-brand-50 disabled:opacity-30"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
