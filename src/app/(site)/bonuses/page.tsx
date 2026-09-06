import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import { BONUS_PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Bonus Guides | Natural Wellness Library",
  description:
    "Get 2 free bonus guides — the Natural Wellness Quick Guide and the 30-Day Healthy Habits Challenge — included with the complete library.",
  path: "/bonuses",
});

export default function BonusesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-950 section-pad !pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative">
          <Breadcrumbs dark items={[{ name: "Bonuses", href: "/bonuses" }]} />
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="eyebrow bg-white/10 text-gold-300">Free Bonus Guides</span>
            <h1 className="mt-5 font-display text-3xl font-bold text-balance text-white sm:text-4xl">
              Get 2 Bonus Guides Free
            </h1>
            <p className="mt-4 text-balance leading-relaxed text-ink-300">
              Complete your wellness library with two practical bonus
              resources — included at no extra cost with the complete
              library bundle.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            {BONUS_PRODUCTS.map((b) => (
              <ProductCard key={b.slug} product={b} />
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-2xl text-center">
            <p className="text-sm text-ink-500">
              These are free bonus resources, not part of the paid core
              library — buy the complete bundle to unlock everything at once.
            </p>
            <Link href="/checkout" className="btn-primary mt-6">
              Get the Complete Library <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
