"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Lock, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCover from "@/components/ProductCover";

export default function IndividualCheckoutClient({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const integrated = product.plannerAndSystemIncludedInEbook;

  const includes = [
    "Full Ebook PDF",
    integrated ? "Planner (included inside the ebook)" : "Matching Planner",
    integrated ? "30-Day System (included inside the ebook)" : "30-Day System",
  ];

  // NOTE: This is a placeholder purchase handler. Replace this function's
  // contents with your Shopify Buy Button / Checkout API redirect logic for
  // this individual product.
  function handlePurchaseClick() {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      alert(
        "This is a placeholder checkout. Connect this button to your Shopify checkout to process real payments."
      );
    }, 600);
  }

  return (
    <div className="section-pad">
      <div className="container-page">
        <Link
          href={`/library/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
        >
          <ArrowLeft size={15} /> Back to {product.title}
        </Link>

        <div className="mx-auto mt-8 grid max-w-4xl gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <span className="eyebrow">Checkout</span>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-3 max-w-md leading-relaxed text-ink-600">
              Instant digital access to this guide only — {product.subtitle}
            </p>

            <ul className="mt-8 space-y-3">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-dashed border-ink-900/[0.15] bg-cream p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-500">
                <ShieldCheck size={14} /> Developer note
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-500">
                This is a placeholder checkout page for {product.title} only —
                no payment processing occurs here. Connect the &ldquo;Get This
                Guide&rdquo; button below to your Shopify checkout URL or Buy
                Button for this specific product to accept real payments.
                Want everything instead?{" "}
                <Link href="/checkout" className="font-semibold text-brand-700 underline hover:text-brand-800">
                  See the complete library bundle
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card sticky top-24 overflow-hidden p-6 sm:p-8">
              <div className="mx-auto w-32 sm:w-40">
                <ProductCover product={product} className="aspect-[3/4] w-full" priority />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-wide text-ink-400">
                Order Summary
              </p>
              <div className="mt-4 flex items-center justify-between border-b border-ink-900/[0.07] pb-4">
                <p className="text-sm font-medium text-ink-700">{product.title}</p>
                <p className="text-sm font-bold text-ink-900">
                  {product.price === null
                    ? "Price coming soon"
                    : product.price === 0
                      ? "Free"
                      : `$${product.price}`}
                </p>
              </div>

              {product.price !== null && product.price > 0 && (
                <div className="mt-4 flex items-end justify-between gap-3 rounded-lg border border-gold-400/25 bg-gold-50/60 px-3 py-2.5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wide text-ink-500">Launch Price</p>
                    <span className="font-display text-2xl font-black leading-none text-ink-950">
                      ${product.price}
                    </span>
                  </div>
                  {product.compareAtPrice != null && (
                    <div className="pb-0.5 text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-ink-400">Guide Value</p>
                      <span className="text-sm font-semibold text-ink-500">${product.compareAtPrice}</span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handlePurchaseClick}
                disabled={loading}
                className="btn-gold mt-6 w-full"
              >
                <Lock size={15} />
                {loading ? "Processing..." : "Get This Guide"}
              </button>
              <p className="mt-3 text-center text-xs text-ink-400">
                Payment processing not yet connected — see developer note.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
