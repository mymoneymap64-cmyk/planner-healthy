"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import ProductCover from "@/components/ProductCover";
import FavoriteButton from "@/components/wellness-dashboard/FavoriteButton";
import { PRODUCTS, BONUS_PRODUCTS } from "@/data/products";
import { DemoWellnessState } from "../useDemoWellnessState";

export default function DemoLibrary({ demo }: { demo: DemoWellnessState }) {
  const { dashboard, toggleFavorite } = demo;
  const products = [...PRODUCTS, ...BONUS_PRODUCTS];

  return (
    <div className="section-pad !pt-8">
      <div className="container-page">
        <span className="eyebrow">Your Collection</span>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">My Library</h1>
        <p className="mt-2 text-ink-500">
          Every guide in the Natural Wellness Library, shown here exactly as a real customer would see it.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const isFavorite = dashboard.favorites.guides.includes(product.slug);
            return (
              <div key={product.slug} className="overflow-hidden rounded-xl border border-ink-900/10 bg-white">
                <div className="relative">
                  <ProductCover product={product} className="aspect-[3/4] w-full" />
                  <div className="absolute right-2 top-2">
                    <FavoriteButton active={isFavorite} onToggle={() => toggleFavorite("guides", product.slug)} />
                  </div>
                </div>
                <div className="p-2.5 text-center">
                  <p className="text-xs font-bold text-ink-800">{product.categoryLabel}</p>
                  <Link
                    href={`/library/${product.slug}`}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 hover:underline"
                  >
                    <Eye size={11} /> View guide
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-ink-400">
          After checkout, this page becomes your real library with the ebook, planner, and system for every guide you own.
        </p>
      </div>
    </div>
  );
}
