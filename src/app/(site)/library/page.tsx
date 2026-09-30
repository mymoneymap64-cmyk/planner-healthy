import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
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
      <section className="relative overflow-hidden bg-ink-950 section-pad !pb-14">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative">
          <Breadcrumbs dark items={[{ name: "Library", href: "/library" }]} />
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="eyebrow bg-white/10 text-gold-300">The Wellness Library</span>
            <h1 className="mt-5 font-display text-3xl font-bold text-balance text-white sm:text-4xl">
              7 practical guides. One complete wellness collection.
            </h1>
            <p className="mt-4 text-balance leading-relaxed text-ink-300">
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
          <SectionHeading eyebrow="Core Guides" title="The 7 core guides" align="left" />
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Free Bonuses" title="2 free bonus guides" align="left" />
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
