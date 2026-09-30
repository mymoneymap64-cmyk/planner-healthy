import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { STANDALONE_PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ebook Library | Natural Wellness Library",
  description:
    "Explore practical ebooks made to help you learn, create, cook, and enjoy more.",
  path: "/ebooks",
});

/**
 * A separate storefront for standalone ebooks (e.g. the cookbook) — distinct
 * from the 7-guide Wellness Library and never mixed into it. Reads from
 * STANDALONE_PRODUCTS only, so a future standalone ebook just needs an entry
 * added there; nothing here is hardcoded to any one product.
 */
export default function EbooksPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-950 section-pad !pb-14">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative">
          <Breadcrumbs dark items={[{ name: "Ebooks", href: "/ebooks" }]} />
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="eyebrow bg-white/10 text-gold-300">Ebooks</span>
            <h1 className="mt-5 font-display text-3xl font-bold text-balance text-white sm:text-4xl">
              Ebook Library
            </h1>
            <p className="mt-4 text-balance leading-relaxed text-ink-300">
              Explore practical ebooks made to help you learn, create, cook,
              and enjoy more.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          {STANDALONE_PRODUCTS.length > 0 ? (
            <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {STANDALONE_PRODUCTS.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-ink-500">
              New ebooks are on the way — check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
