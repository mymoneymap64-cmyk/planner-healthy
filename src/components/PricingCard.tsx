import Link from "next/link";
import { BookOpen, Check, ClipboardList, Gift, ListChecks } from "lucide-react";
import { PRODUCTS, BONUS_PRODUCTS, BUNDLE_PRICE } from "@/data/products";

const STACK = [
  { icon: BookOpen, count: PRODUCTS.length, label: "Premium Wellness Ebooks" },
  { icon: ClipboardList, count: PRODUCTS.length, label: "Matching Planners*" },
  { icon: ListChecks, count: PRODUCTS.length, label: "30-Day Systems*" },
  { icon: Gift, count: BONUS_PRODUCTS.length, label: "Free Bonus Guides" },
];

export default function PricingCard() {
  const totalResources = PRODUCTS.length * 3 + BONUS_PRODUCTS.length;
  const individualValue = PRODUCTS.reduce((sum, p) => sum + (p.compareAtPrice ?? 0), 0);

  return (
    <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border-2 border-brand-600 bg-white p-8 shadow-lift sm:p-10">
      <span className="absolute right-6 top-6 rounded-full bg-gold-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-900">
        Complete Library
      </span>

      <p className="text-xs font-bold uppercase tracking-wide text-brand-700">
        The Complete Bundle
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold text-ink-900">
        The Natural Wellness Library
      </h3>
      <p className="mt-1.5 text-sm text-ink-500">
        {totalResources} digital resources in one collection.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {STACK.map((s) => (
          <div key={s.label} className="rounded-lg border border-ink-900/10 bg-cream p-3.5">
            <s.icon size={18} className="text-brand-700" />
            <p className="mt-2 font-display text-lg font-bold text-ink-900">{s.count}</p>
            <p className="text-xs text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>

      {individualValue > 0 && (
        <p className="mt-6 text-sm text-ink-500">
          Combined guide value: <span className="font-semibold text-ink-700">${individualValue}</span>
        </p>
      )}
      <div className="mt-1 flex items-end gap-3">
        <span className="font-display text-4xl font-black text-ink-900">${BUNDLE_PRICE}</span>
      </div>
      <p className="mt-1 text-sm text-ink-500">
        One-time payment · Instant digital access to everything.
      </p>

      <ul className="mt-7 space-y-3">
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

      <Link href="/checkout" className="btn-gold mt-8 w-full">
        Get the Complete Library
      </Link>
      <p className="mt-3 text-center text-xs text-ink-400">
        Secure checkout · Instant digital access
      </p>
      <p className="mt-4 text-[11px] leading-relaxed text-ink-400">
        *The Natural Healing Handbook&apos;s planner and 30-day system are
        built directly into its ebook rather than shipped as separate files.
      </p>
    </div>
  );
}
