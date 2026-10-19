import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import LibraryProductCard from "@/components/LibraryProductCard";
import PricingCard from "@/components/PricingCard";
import CTASection from "@/components/CTASection";
import { PRODUCTS, BONUS_PRODUCTS, STANDALONE_PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Wellness Library | Natural Wellness Library",
  description:
    "Browse all 7 guides in the Natural Wellness Library — natural healing, mental wellness, women's and men's wellness, herbal remedies, sleep & recovery, and healthy eating.",
  path: "/library",
});

export default function LibraryPage() {
  return (
    <div>
      {/* INTRO — deliberately compact: breadcrumbs + a short lead-in, not a
          full hero, so the actual catalogue is visible almost immediately. */}
      <section className="bg-gradient-to-b from-brand-50 to-cream pb-10 pt-8 sm:pb-12 sm:pt-10">
        <div className="container-page">
          <Breadcrumbs items={[{ name: "Library", href: "/library" }]} />
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <span className="eyebrow">The Wellness Library</span>
            <h1 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              7 practical guides. One complete wellness collection.
            </h1>
            <p className="mt-3 text-balance leading-relaxed text-ink-600">
              Each guide pairs an ebook with a matching planner and 30-day
              system. Buy any guide individually, or get the complete
              library as one bundle — plus {BONUS_PRODUCTS.length} free
              bonus guides.
            </p>
          </div>
        </div>
      </section>

      {/* CORE GUIDES */}
      <section className="section-pad !pt-10">
        <div className="container-page">
          <div className="flex flex-col gap-6 border-b border-ink-900/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Core Guides</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                The 7 Core Guides
              </h2>
            </div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-brand-700">
              {PRODUCTS.length} Guides &middot; Ebook + Planner + System
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <LibraryProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE LIBRARY BUNDLE */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="Best Value" title="Or Get the Complete Wellness Library" />
            <div className="mt-12">
              <PricingCard />
            </div>
          </div>
        </div>
      </section>

      {/* MORE FROM THE LIBRARY — standalone guides, sold on their own */}
      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-col gap-6 border-b border-ink-900/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">More From the Library</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Standalone Guides
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink-600">
                Sold on their own — not part of the core wellness bundle.
                These standalone ebooks are sold individually and do not
                include a planner or 30-day system.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {STANDALONE_PRODUCTS.map((p) => (
              <LibraryProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FREE BONUSES */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 border-b border-ink-900/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Free Bonuses</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                {BONUS_PRODUCTS.length} Free Bonus Guides
              </h2>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink-600">
                These bonus guides are ebook-only, with no planner or
                30-day system included.
              </p>
            </div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-gold-700">
              Included Free With Every Purchase
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {BONUS_PRODUCTS.map((b) => (
              <LibraryProductCard key={b.slug} product={b} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/bonuses" className="text-sm font-bold text-brand-700 hover:underline inline-flex items-center gap-1.5">
              See All Bonus Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
