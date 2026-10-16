import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import { PRODUCTS, BONUS_PRODUCTS } from "@/data/products";
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
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-cream section-pad !pb-14">
        <div className="container-page relative">
          <Breadcrumbs items={[{ name: "Library", href: "/library" }]} />
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="eyebrow">The Wellness Library</span>
            <h1 className="mt-5 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              7 practical guides. One complete wellness collection.
            </h1>
            <p className="mt-4 text-balance leading-relaxed text-ink-600">
              Each guide pairs an ebook with a matching planner and 30-day
              system. Buy any guide individually, or get the complete
              library as one bundle — plus {BONUS_PRODUCTS.length} free
              bonus guides.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-col gap-6 border-b border-ink-900/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Core Guides</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                The 7 core guides
              </h2>
            </div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-brand-700">
              {PRODUCTS.length} Guides &middot; Ebook + Planner + System
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 border-b border-ink-900/8 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Free Bonuses</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                {BONUS_PRODUCTS.length} free bonus guides
              </h2>
            </div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-gold-700">
              Included Free With Every Purchase
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BONUS_PRODUCTS.map((b) => (
              <ProductCard key={b.slug} product={b} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
