"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Lock, ShieldCheck } from "lucide-react";
import { PRODUCTS, BONUS_PRODUCTS } from "@/data/products";
import ProductCover from "@/components/ProductCover";

// There's no single bundle cover asset, so this composes one from real
// covers — tightly stacked and centered (not spread into a row) so it reads
// as one bundle product, not four separate items being purchased. Picked
// for maximum visual contrast (dark green illustration, cream/sage photo,
// blush floral, deep navy photo) so each of the 4 is clearly a different
// book at a glance, not a repeated cover.
const BUNDLE_STACK = [
  { ...PRODUCTS[2], layout: "left-[18%] top-[15%] h-16 sm:h-20 aspect-[3/4] rotate-[-13deg] z-10" }, // Women's Wellness — blush/pink
  { ...PRODUCTS[5], layout: "left-[64%] top-[15%] h-16 sm:h-20 aspect-[3/4] rotate-[12deg] z-10" }, // Sleep & Recovery — deep navy
  { ...PRODUCTS[4], layout: "left-[42%] top-[6%] h-20 sm:h-24 aspect-[3/4] rotate-[-4deg] z-20" }, // Natural Remedies — cream/sage
  { ...PRODUCTS[0], layout: "left-[34%] top-0 h-24 sm:h-28 aspect-[3/4] rotate-[2deg] z-30" }, // Natural Healing Handbook — dark green
];

export default function CheckoutClient() {
  const [loading, setLoading] = useState(false);

  // NOTE: This is a placeholder purchase handler. Replace this function's
  // contents with your Shopify Buy Button / Checkout API redirect logic.
  // Keep the UI below as-is, or adapt it to match your Shopify theme.
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
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline">
          <ArrowLeft size={15} /> Back to Home
        </Link>

        <div className="mx-auto mt-8 grid max-w-4xl gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <span className="eyebrow">Checkout</span>
            <h1 className="mt-4 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              The Complete Wellness Library
            </h1>
            <p className="mt-3 max-w-md leading-relaxed text-ink-600">
              Instant digital access to all {PRODUCTS.length} guides in the
              library, plus {BONUS_PRODUCTS.length} free bonus guides.
            </p>

            <ul className="mt-8 space-y-3">
              {PRODUCTS.map((p) => (
                <li key={p.slug} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {p.title}
                </li>
              ))}
              {BONUS_PRODUCTS.map((b) => (
                <li key={b.slug} className="flex items-start gap-3 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {b.title} <span className="text-ink-400">(free bonus)</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-dashed border-ink-900/[0.15] bg-cream p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-500">
                <ShieldCheck size={14} /> Developer note
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-500">
                This is a placeholder checkout page — no payment processing
                occurs here, and bundle pricing has not been finalized yet.
                Connect the &ldquo;Get the Complete Library&rdquo; button below
                to your Shopify checkout URL or Buy Button to accept real
                payments once pricing is set.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card sticky top-24 overflow-hidden p-6 sm:p-8">
              <div className="relative -mx-6 -mt-6 h-32 overflow-hidden bg-ink-950 sm:-mx-8 sm:-mt-8 sm:h-36">
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:18px_18px]" />
                {BUNDLE_STACK.map((product) => (
                  <ProductCover
                    key={product.slug}
                    product={product}
                    className={`absolute w-auto border border-white/10 ${product.layout}`}
                  />
                ))}
                <span className="absolute left-3 top-3 z-40 rounded-full bg-gold-400 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-ink-950 shadow">
                  Complete Library
                </span>
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-wide text-ink-400">
                Order Summary
              </p>
              <div className="mt-4 flex items-center justify-between border-b border-ink-900/[0.07] pb-4">
                <p className="text-sm font-medium text-ink-700">
                  The Complete Wellness Library
                </p>
                <p className="text-sm font-bold text-ink-900">Price coming soon</p>
              </div>
              <p className="mt-4 text-sm text-ink-500">
                Final bundle pricing will be confirmed before launch.
              </p>

              <button
                onClick={handlePurchaseClick}
                disabled={loading}
                className="btn-gold mt-6 w-full"
              >
                <Lock size={15} />
                {loading ? "Processing..." : "Get the Complete Library"}
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
