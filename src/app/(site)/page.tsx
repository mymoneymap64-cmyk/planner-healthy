import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Gift,
  Leaf,
  LineChart,
  ListChecks,
  Lock,
  NotebookPen,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import ProductCard from "@/components/ProductCard";
import ProductCover from "@/components/ProductCover";
import PriceBadge from "@/components/PriceBadge";
import PricingCard from "@/components/PricingCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import JsonLd from "@/components/JsonLd";
import ResponsiveImage from "@/components/ResponsiveImage";
import ProductCarousel from "@/components/ProductCarousel";
import BakingVideoSection from "@/components/BakingVideoSection";
import FeaturedCakeCarousel from "@/components/FeaturedCakeCarousel";
import BakingJourneySection from "@/components/BakingJourneySection";
import DemoDashboardUI from "@/components/wellness-landing/DemoDashboardUI";
import { PRODUCTS, BONUS_PRODUCTS, STANDALONE_PRODUCTS, BUNDLE_PRICE } from "@/data/products";
import { BLOG_POSTS } from "@/data/blog/posts";
import { FAQS } from "@/data/faq";
import { buildMetadata, productJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Premium Wellness Ebooks, Planners & 30-Day Wellness Systems | Natural Wellness Library",
  description:
    "A curated collection of 7 premium wellness ebooks — natural healing, mental wellness, women's and men's wellness, herbal recipes, sleep & recovery, and healthy eating — each with a matching wellness planner and 30-day wellness system.",
  path: "/",
});

// Replaces the old MORE_THAN_A_PDF_BENEFITS + WHATS_INCLUDED + the separate
// Planner/30-Day-System spotlight sections — one consolidated breakdown
// instead of explaining the same ebook/planner/system bundle four times.
// Scoped explicitly to the 7 core guides: the 2 free bonuses and the
// standalone Cake Cookbook/Food Preservation guides are ebook-only and are
// never implied to include a planner or 30-day system.
const WHAT_YOU_GET = [
  { icon: BookOpen, title: "The Ebook", desc: "Practical, plain-language wellness information you can read anytime, on any device." },
  { icon: ClipboardList, title: "The Planner", desc: "Daily planning pages, trackers, and reflection prompts to turn what you read into a plan." },
  { icon: ListChecks, title: "The 30-Day System", desc: "A week-by-week structure to apply what you learn and build the habit into your routine." },
];

const HOW_IT_WORKS = [
  { icon: BookOpen, step: "01", title: "Learn", role: "Ebook", desc: "Read the guide to understand the why behind each habit — practical, plain-language information you can actually use." },
  { icon: ClipboardList, step: "02", title: "Plan", role: "Planner", desc: "Use the matching planner to turn what you learned into a concrete daily and weekly plan." },
  { icon: ListChecks, step: "03", title: "Apply", role: "30-Day System", desc: "Follow the 30-day system to build the habit into your routine, week by week." },
];

// Three real, live features of the Wellness System dashboard — matching
// exactly what DemoDashboardUI shows and what /wellness-system describes.
// No invented capabilities (AI coaching, community, etc.) and no claimed
// customer outcomes — just what the dashboard actually does.
const WELLNESS_SYSTEM_FEATURES = [
  { icon: ListChecks, title: "Daily Checklists", desc: "Simple, repeatable checklists for each guide so you can track what you actually did each day." },
  { icon: NotebookPen, title: "Personal Notes", desc: "Jot down what's working (or not) as you go — private notes tied to your own progress." },
  { icon: LineChart, title: "Progress Tracking", desc: "See how far you've gotten through each guide at a glance, instead of losing your place." },
];

// Absorbs the old separate "Designed For Real Life" section's writing-
// philosophy points (realistic/plain-language/structured) alongside the
// original value points — one list instead of two sections making
// adjacent arguments. The old "More than ebooks" (ebook+planner+system)
// point was dropped here since Phase 1's "What You Get" section already
// covers that exact claim.
const WHY_THIS_LIBRARY = [
  { icon: Leaf, title: "Practical over theoretical", desc: "Each guide focuses on information you can actually use, organized so you can find what you need without reading the whole thing front to back." },
  { icon: Smartphone, title: "No app, no account, no subscription", desc: "Every guide is a plain digital PDF that works on any device. Pay once, keep it forever — nothing to install." },
  { icon: ShieldCheck, title: "No exaggerated claims", desc: "These are practical, educational wellness guides — not medical advice, and not a promise of specific results." },
  { icon: BookOpen, title: "Realistic, not extreme", desc: "No fad rules or all-or-nothing systems — habits you can keep up with a normal, busy life." },
  { icon: ClipboardList, title: "Plain language, clearly structured", desc: "Written to be read and used, not decoded — paired with a planner and 30-day system to apply what you read, not just skim once." },
];

const CAKE_COOKBOOK = STANDALONE_PRODUCTS.find((p) => p.slug === "the-cake-cookbook")!;
const FOOD_PRESERVATION = STANDALONE_PRODUCTS.find((p) => p.slug === "complete-guide-home-food-preservation")!;

// Three representative core guides, each given a full-width editorial
// presentation. The remaining 4 core guides + 2 standalone products still
// get real, equal billing just below, in the "Additional Guides" carousel —
// nothing here is hidden or demoted, just given a slower, bigger showcase.
const FEATURED_GUIDE_SLUGS = ["natural-healing-handbook", "mental-wellness-guide", "healthy-eating-guide"];
const FEATURED_GUIDES = FEATURED_GUIDE_SLUGS.map((slug) => PRODUCTS.find((p) => p.slug === slug)!);
const ADDITIONAL_GUIDES = [
  ...PRODUCTS.filter((p) => !FEATURED_GUIDE_SLUGS.includes(p.slug)),
  FOOD_PRESERVATION,
];

// The full Cake & Baking Collection shown on the homepage: the two original
// 2,400-recipe-combination ebooks plus all eight newly written ebooks. Kept
// as one horizontal carousel (not separate sections) so the collection can
// keep growing without lengthening the homepage.
const CAKE_BAKING_SLUGS = [
  "ultimate-cake-recipe-collection",
  "modern-cakes-creative-desserts",
  "cake-baking-for-beginners",
  "cake-decorating-and-frosting-handbook",
  "cheesecake-cupcake-mini-cake-cookbook",
  "celebration-cakes-for-every-occasion",
  "cookies-brownies-dessert-bars",
  "pies-tarts-fruit-desserts",
  "no-bake-desserts-chilled-cakes",
  "sweet-breads-rolls-breakfast-bakes",
];
const CAKE_BAKING_COLLECTION = CAKE_BAKING_SLUGS.map(
  (slug) => STANDALONE_PRODUCTS.find((p) => p.slug === slug)!
);

// A small, honest sample of recent posts for the compact blog link row —
// not a duplicate of the full /blog index, just enough to invite a click.
const FEATURED_BLOG_POSTS = BLOG_POSTS.slice(0, 3);

// Small cover samples for the three hero destination cards — real products
// only, reusing the same slugs already featured elsewhere on the page
// (FEATURED_GUIDE_SLUGS, CAKE_BAKING_SLUGS) so nothing new is invented here.
const HERO_WELLNESS_COVERS = FEATURED_GUIDE_SLUGS.map((slug) => PRODUCTS.find((p) => p.slug === slug)!);
const HERO_CAKE_COVERS = CAKE_BAKING_SLUGS.slice(0, 3).map(
  (slug) => STANDALONE_PRODUCTS.find((p) => p.slug === slug)!
);

export default function Home() {
  return (
    <>
      <JsonLd data={productJsonLd({ price: BUNDLE_PRICE, path: "/" })} />

      {/* HERO — a premium-digital-bookstore first screen: real product
          covers and the real Wellness System preview do the visual work,
          not a stock lifestyle photo. No dark overlay, no background image. */}
      <section className="bg-gradient-to-b from-brand-50 to-cream">
        <div className="container-page py-14 text-center sm:py-18 lg:py-20">
          <span className="eyebrow">Natural Wellness Library</span>
          <h1 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.1] text-balance text-ink-950 sm:text-5xl">
            Discover Your Next Favorite Ebook
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-600 sm:text-lg">
            Explore practical wellness ebooks, helpful planners, an
            interactive Wellness System, and baking ebooks to inspire
            your next creation.
          </p>
          <p className="mt-5 text-sm text-ink-500">
            Already purchased?{" "}
            <Link href="/access" className="font-semibold text-brand-700 underline hover:text-brand-800">
              Find Your Access Link
            </Link>
          </p>
        </div>

        {/* THREE DESTINATIONS — real covers, the real Wellness System
            preview, and real prices. No invented products or claims. */}
        <div className="container-page pb-14 sm:pb-18 lg:pb-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* CARD 1 — WELLNESS EBOOKS & PLANNERS */}
            <div className="flex flex-col rounded-[1.75rem] border border-ink-900/8 bg-white p-6 shadow-soft sm:p-7">
              <div className="flex h-36 items-center justify-center gap-0">
                {HERO_WELLNESS_COVERS.map((p, i) => (
                  <div
                    key={p.slug}
                    className="w-20 shrink-0 -ml-5 first:ml-0"
                    style={{ zIndex: i, transform: `rotate(${(i - 1) * 6}deg)` }}
                  >
                    <ProductCover product={p} className="aspect-[2/3] w-full shadow-lift" />
                  </div>
                ))}
              </div>
              <h2 className="mt-5 font-display text-xl font-bold text-ink-950">
                Wellness Ebooks &amp; Planners
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                Practical digital guides and matching planners for
                everyday wellness — natural healing, mental wellness,
                sleep, and more.
              </p>
              <Link href="/library" className="btn-gold mt-5 w-full justify-center">
                Explore Wellness Ebooks <ArrowRight size={16} />
              </Link>
            </div>

            {/* CARD 2 — WELLNESS SYSTEM */}
            <div className="flex flex-col rounded-[1.75rem] border border-brand-100 bg-brand-50/60 p-6 shadow-soft sm:p-7">
              <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-soft">
                <DemoDashboardUI variant="laptop" />
              </div>
              <h2 className="mt-5 font-display text-xl font-bold text-ink-950">Wellness System</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                Your Daily Plan, Checklists, Notes, and Progress Tracking
                in one place — turning each guide into a routine you
                actually follow.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Link href="/wellness-system" className="btn-gold w-full justify-center">
                  Explore Wellness System <ArrowRight size={16} />
                </Link>
                <Link
                  href="/wellness-system/demo"
                  className="flex items-center justify-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
                >
                  <PlayCircle size={15} /> Try the Demo
                </Link>
              </div>
            </div>

            {/* CARD 3 — CAKE & BAKING EBOOKS */}
            <div className="flex flex-col rounded-[1.75rem] border border-ink-900/8 bg-white p-6 shadow-soft sm:p-7">
              <div className="flex h-36 items-center justify-center gap-0">
                {HERO_CAKE_COVERS.map((p, i) => (
                  <div
                    key={p.slug}
                    className="w-20 shrink-0 -ml-5 first:ml-0"
                    style={{ zIndex: i, transform: `rotate(${(i - 1) * 6}deg)` }}
                  >
                    <ProductCover product={p} className="aspect-[2/3] w-full shadow-lift" />
                  </div>
                ))}
              </div>
              <h2 className="mt-5 font-display text-xl font-bold text-ink-950">Cake &amp; Baking Ebooks</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Ten standalone baking ebooks, from beginner basics to
                decorating, cheesecakes, and more.
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-gold-700">
                {CAKE_BAKING_SLUGS.length} digital baking ebooks · $2.99 each
              </p>
              <Link href="/cake-baking-collection" className="btn-gold mt-5 w-full justify-center">
                Explore Cake &amp; Baking <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WELLNESS BUNDLE — a major promotional highlight reusing
          the exact same PRODUCTS/BONUS_PRODUCTS/BUNDLE_PRICE data and
          /checkout route as the PricingCard further down the page. This is
          a bolder editorial presentation of the same real bundle, not a
          second product or a new checkout — no discount, savings, or
          "value" comparison figure is shown here, to avoid implying a sale
          that doesn't exist. */}
      <section className="section-pad border-y border-ink-900/8 bg-gradient-to-b from-cream to-brand-50/50">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="mx-auto flex justify-center lg:justify-start">
              <div className="flex items-center">
                {PRODUCTS.map((p, i) => (
                  <div
                    key={p.slug}
                    className="w-16 shrink-0 -ml-7 first:ml-0 sm:w-20"
                    style={{ zIndex: i, transform: `rotate(${(i - 3) * 5}deg)` }}
                  >
                    <ProductCover product={p} className="aspect-[2/3] w-full shadow-lift" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow bg-gold-100 text-gold-700">Featured Bundle</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl lg:text-5xl">
                Your Complete Wellness Library
              </h2>
              <p className="mt-4 max-w-lg text-balance text-base leading-relaxed text-ink-600">
                Every core wellness ebook in one collection, each paired
                with a matching planner and 30-day system,* plus 2 free
                bonus guides — all in a single digital library.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  `${PRODUCTS.length} premium wellness ebooks`,
                  "A matching planner and 30-day system for each guide*",
                  `${BONUS_PRODUCTS.length} free bonus guides included`,
                  "Instant digital access, works on any device",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-end gap-3">
                <span className="font-display text-5xl font-black text-ink-950">${BUNDLE_PRICE}</span>
                <span className="mb-1.5 text-sm text-ink-500">one-time payment</span>
              </div>

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link href="/checkout" className="btn-gold w-full justify-center sm:w-auto">
                  Get the Complete Library <ArrowRight size={16} />
                </Link>
                <Link href="/library" className="text-sm font-bold text-brand-700 hover:underline">
                  Browse the Full Library
                </Link>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-ink-400">
                *The Natural Healing Handbook&apos;s planner and 30-day
                system are built directly into its ebook rather than
                shipped as separate files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW STRIP — accurate across both verticals (previously
          wellness-only, which read as incomplete/confusing once baking
          ebooks got equal billing above). */}
      <section className="border-b border-ink-900/8 bg-brand-50/50">
        <div className="container-page grid grid-cols-2 divide-x divide-y divide-ink-900/8 sm:grid-cols-4 sm:divide-y-0">
          {[
            { icon: BookOpen, count: PRODUCTS.length, label: "Wellness Ebooks" },
            { icon: BookOpen, count: CAKE_BAKING_SLUGS.length, label: "Baking Ebooks" },
            { icon: ListChecks, count: 1, label: "Wellness System" },
            { icon: Gift, count: BONUS_PRODUCTS.length, label: "Free Bonuses" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center gap-1.5 px-4 py-8 text-center sm:py-10">
              <s.icon size={20} className="mb-1 text-brand-600" />
              <p className="font-display text-4xl font-bold text-brand-700 sm:text-5xl">{s.count}</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WELLNESS SYSTEM FEATURE — a real, dedicated feature near the top,
          not just another ebook card. DemoDashboardUI is the same honest,
          clearly-fictional mockup already used on /wellness-system — no new
          capabilities invented here. */}
      <section className="section-pad bg-cream">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <span className="eyebrow">The Wellness System</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Turn Any Guide Into a Daily Routine
              </h2>
              <p className="mt-4 text-balance text-base leading-relaxed text-ink-600">
                Every core wellness guide comes with an interactive
                dashboard that brings it to life — practical routines,
                daily checklists, personal notes, and progress tracking,
                so what you read actually turns into something you do.
              </p>

              <div className="mt-8 space-y-6 border-t border-ink-900/8 pt-7">
                {WELLNESS_SYSTEM_FEATURES.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <item.icon size={18} />
                    </span>
                    <div>
                      <p className="font-display text-base font-bold text-ink-950">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link href="/wellness-system" className="btn-gold w-full justify-center sm:w-auto">
                  Explore the Wellness System <ArrowRight size={16} />
                </Link>
                <Link
                  href="/wellness-system/demo"
                  className="flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
                >
                  <PlayCircle size={16} /> See the Live Demo
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-brand-100 bg-white p-4 shadow-soft sm:p-6">
              <DemoDashboardUI variant="showcase" />
            </div>
          </div>
        </div>
      </section>

      {/* CAKE & BAKING COLLECTION FEATURE — a major featured section, not a
          text link: the family-baking lifestyle journey, the automatic
          10-ebook carousel, and a strong CTA to the dedicated collection
          page. The carousel now lives here, well below the brand and
          Wellness System message, instead of at the very top of the page. */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Cake &amp; Baking Collection</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              Ten Baking Ebooks, One Collection
            </h2>
            <p className="mt-4 text-balance text-base leading-relaxed text-ink-600">
              From beginner cake basics to decorating, cheesecakes,
              cookies, pies, no-bake desserts, and breakfast bakes — each
              ebook is a one-time $2.99 digital PDF.
            </p>
          </div>

          <div className="mt-12">
            <BakingJourneySection ctaHref="/cake-baking-collection" ctaLabel="Explore the Full Collection" />
          </div>

          <div className="mt-16 border-t border-ink-900/8 pt-12">
            <FeaturedCakeCarousel products={CAKE_BAKING_COLLECTION} />
          </div>

          <div className="mt-10 text-center">
            <Link href="/cake-baking-collection" className="btn-gold">
              Explore the Full Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE — CATEGORIES */}
      <section id="included" className="border-b border-ink-900/10 bg-cream py-8">
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-wide text-ink-400">What&apos;s Inside</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={`/library/${p.slug}`}
                className="flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                {p.categoryLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WELLNESS BOOKS — generous, alternating, one guide at a time */}
      <section className="section-pad bg-cream">
        <div className="container-page">
          <SectionHeading
            eyebrow="Featured Guides"
            title="Find the Right Guide for Your Journey"
            description="Three of our most popular wellness guides — each a complete ebook, planner, and 30-day system in one."
            align="left"
          />
          <div className="mt-16 space-y-20">
            {FEATURED_GUIDES.map((product, i) => {
              const isReversed = i % 2 === 1;
              return (
                <div
                  key={product.slug}
                  className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-14"
                >
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <div className="mx-auto w-full max-w-[260px] lg:max-w-[320px]">
                      <ProductCover product={product} className="aspect-[2/3] w-full shadow-lift" />
                    </div>
                  </div>
                  <div className={`max-w-[46ch] ${isReversed ? "lg:order-1" : ""}`}>
                    <span className="eyebrow">{product.categoryLabel}</span>
                    <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-balance text-ink-950 sm:text-4xl">
                      {product.title}
                    </h3>
                    <p className="mt-3 font-display text-lg italic leading-snug text-ink-600">
                      {product.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-500">{product.description}</p>

                    {product.benefits.length > 0 && (
                      <ul className="mt-5 space-y-2.5">
                        {product.benefits.slice(0, 3).map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-600" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 max-w-[220px]">
                      <PriceBadge price={product.price!} compareAtPrice={product.compareAtPrice} />
                    </div>

                    <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                      <Link href={`/library/${product.slug}`} className="btn-gold w-full justify-center sm:w-auto">
                        View Guide <ArrowRight size={16} />
                      </Link>
                      <Link
                        href={`/checkout/${product.slug}`}
                        className="text-sm font-bold text-brand-700 hover:underline"
                      >
                        Get This Guide
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADDITIONAL GUIDES & COMPLETE LIBRARY — the rest of the catalogue, plus the bundle */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">The Rest of the Library</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                More Guides to Explore
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Every guide pairs an ebook with a matching planner and 30-day system.
              </p>
            </div>
            <Link
              href="/library"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline sm:inline-flex"
            >
              View All Guides <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10">
            <ProductCarousel products={ADDITIONAL_GUIDES} />
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <SectionHeading eyebrow="Best Value" title="Or Get the Complete Wellness Library" />
            <div className="mt-12">
              <PricingCard />
            </div>
          </div>
        </div>
      </section>

      {/* CAKE COOKBOOK SPOTLIGHT — full-bleed magazine feature, not a floating
          card. A separate, standalone product from the 10-ebook Cake &
          Baking Collection above — not to be confused or merged with it. */}
      <section className="relative overflow-hidden bg-gold-50">
        <div className="container-page grid items-center gap-8 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.3fr] lg:gap-0 lg:py-0">
          <div className="relative mx-auto flex w-full max-w-[260px] justify-center py-2 sm:max-w-[300px] lg:max-w-none lg:py-24">
            <div className="pointer-events-none absolute inset-0 -z-10 m-auto h-[75%] w-[75%] rounded-full bg-gold-200/50 blur-3xl" />
            <div className="relative w-full max-w-[280px] lg:max-w-[340px] lg:-rotate-2">
              <ProductCover product={CAKE_COOKBOOK} className="aspect-[3/4] w-full shadow-lift" />
              <div className="absolute -bottom-4 -right-4 flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-cream bg-gold-400 text-ink-950 shadow-lift">
                <span className="text-[9px] font-bold uppercase leading-none">Only</span>
                <span className="font-display text-xl font-black leading-tight">${CAKE_COOKBOOK.price}</span>
              </div>
            </div>
          </div>

          <div className="relative py-4 sm:py-6 lg:py-24 lg:pl-20">
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 right-0 select-none font-display text-[6rem] font-black leading-none text-gold-200/70 sm:text-[8rem] lg:right-auto lg:left-[-0.5rem] lg:top-10 lg:text-[11rem]"
            >
              01
            </span>
            <div className="relative lg:max-w-md">
              <span className="eyebrow bg-gold-100 text-gold-700">Featured Cookbook</span>
              <h2 className="mt-5 font-display text-4xl font-bold text-balance text-ink-950 sm:text-5xl">
                Make Something Sweet.
              </h2>
              <p className="mt-3 font-display text-lg font-bold text-ink-800">{CAKE_COOKBOOK.title}</p>
              <p className="mt-4 text-balance text-base leading-relaxed text-ink-600">
                Discover delicious cake recipes and find inspiration for your next baking day.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{CAKE_COOKBOOK.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <div className="w-full max-w-[220px] rounded-lg bg-white p-1 shadow-soft">
                  <PriceBadge price={CAKE_COOKBOOK.price!} compareAtPrice={CAKE_COOKBOOK.compareAtPrice} />
                </div>
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <Link href={`/checkout/${CAKE_COOKBOOK.slug}`} className="btn-gold w-full justify-center sm:w-auto">
                    Get the Cookbook <ArrowRight size={16} />
                  </Link>
                  <Link href={`/library/${CAKE_COOKBOOK.slug}`} className="text-sm font-bold text-brand-700 hover:underline">
                    View Details
                  </Link>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-ink-500">
                <span className="flex items-center gap-1.5">
                  <Zap size={14} className="text-gold-700" /> Instant Digital Access
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} className="text-gold-700" /> {CAKE_COOKBOOK.pageCount} Pages
                </span>
                <span className="flex items-center gap-1.5">
                  <Gift size={14} className="text-gold-700" /> 5 Bonus Frostings &amp; Glazes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WATCH & LEARN — real, verified Preppy Kitchen tutorials, each
          linked to the matching ebook. See src/data/bakingVideos.ts for the
          verified title/channel/URL for every video. */}
      <BakingVideoSection />

      {/* FROM THE BLOG — a compact pointer to the full blog, not a repeat of
          the blog index. Mixes wellness and baking posts since both now
          have equal billing on the homepage. */}
      <section className="section-pad bg-cream">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">From the Blog</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Wellness &amp; Baking Articles
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Free, practical articles — no purchase required.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline sm:inline-flex"
            >
              View All Articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {FEATURED_BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card flex flex-col gap-2 p-5 transition-colors hover:border-brand-200"
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
                  {post.category === "baking-recipes" ? "Baking & Recipes" : "Mental Wellness"}
                </span>
                <p className="font-display text-base font-bold leading-snug text-ink-950">{post.title}</p>
                <p className="line-clamp-2 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog" className="btn-secondary">
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET — consolidates the old More Than a PDF / What's Included /
          Planner Spotlight / 30-Day System sections into one explanation */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <ResponsiveImage
                imageKey="ebookPlannerSystemPromo"
                className="aspect-[3/2] w-full"
                sizes="(min-width: 1024px) 45vw, 100vw"
                rounded="rounded-[2rem]"
              />
            </div>

            <div className="order-1 lg:order-2">
              <span className="eyebrow">What You Get</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Every Core Guide Comes With More Than a PDF.
              </h2>
              <p className="mt-4 text-balance text-base leading-relaxed text-ink-600">
                Each of the 7 core guides pairs practical wellness knowledge
                with an interactive Wellness System, so you can turn what you
                learn into a routine you actually follow.
              </p>

              <div className="mt-8 space-y-6 border-t border-ink-900/8 pt-7">
                {WHAT_YOU_GET.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <item.icon size={18} />
                    </span>
                    <div>
                      <p className="font-display text-base font-bold text-ink-950">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-ink-400">
                Included with every core guide. The 2 free bonus guides and
                the standalone Cake Cookbook are ebook-only.
              </p>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link href="/wellness-system" className="btn-gold w-full justify-center sm:w-auto">
                  See the Wellness System <ArrowRight size={16} />
                </Link>
                <Link href="/library" className="text-sm font-bold text-brand-700 hover:underline">
                  Explore the Wellness Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — a connected timeline, not a repeat of the card grid above */}
      <section id="how-it-works" className="section-pad bg-gradient-to-b from-white to-brand-50/60">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">
            <SectionHeading
              eyebrow="How It Works"
              title="Learn. Plan. Apply."
              description="For every core guide: the ebook teaches it, the planner plans it, the 30-day system helps you apply it."
              align="left"
            />
            <ResponsiveImage
              imageKey="plannerWritingMarbleDesk"
              className="aspect-[3/4] w-full max-w-xs mx-auto lg:mx-0 lg:ml-auto shadow-lift"
              sizes="(min-width: 1024px) 320px, 70vw"
              rounded="rounded-[2rem]"
            />
          </div>
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute left-[26px] top-[26px] hidden h-px w-[calc(100%-52px)] bg-brand-200 sm:block" />
            <ArrowRight
              size={16}
              className="absolute left-[33.33%] top-[26px] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream p-0.5 text-brand-400 sm:block"
            />
            <ArrowRight
              size={16}
              className="absolute left-[66.66%] top-[26px] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream p-0.5 text-brand-400 sm:block"
            />
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {HOW_IT_WORKS.map((s) => (
                <div key={s.step} className="relative flex flex-col items-start">
                  <span className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-4 border-brand-50/60 bg-brand-700 font-display text-lg font-black text-white shadow-card">
                    {s.step}
                  </span>
                  <span className="mt-5 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                    <s.icon size={18} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink-950">{s.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-gold-600">{s.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM — asymmetric lead + divided list, matching the sitewide pattern below, not a card grid */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="eyebrow">Sound Familiar?</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Wellness information is everywhere. A reliable library isn&apos;t.
              </h2>
              <p className="mt-4 max-w-sm text-balance text-base leading-relaxed text-ink-600">
                Most people don&apos;t struggle to find wellness advice — they
                struggle to find advice that&apos;s organized, practical, and
                trustworthy in one place.
              </p>
            </div>
            <div className="divide-y divide-ink-900/8 border-t border-ink-900/8 lg:mt-2">
              {[
                { title: "Scattered across the internet", desc: "Bits of advice spread across dozens of sites, with no clear place to start or return to." },
                { title: "Inconsistent quality", desc: "Hard to tell which sources are practical and which are just filler content." },
                { title: "Nothing to keep", desc: "Articles and social posts disappear or get buried — a library you own doesn't." },
              ].map((p) => (
                <div key={p.title} className="flex flex-col gap-1.5 py-6 sm:flex-row sm:items-baseline sm:gap-10">
                  <h3 className="font-display text-base font-bold text-ink-950 sm:w-56 sm:shrink-0">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-500">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREE BONUSES */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Free Bonus Guides"
            title="Get 2 Bonus Guides Free"
            description="Complete your wellness library with two practical bonus resources, included at no extra cost with the complete library bundle."
          />
          <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
            {BONUS_PRODUCTS.map((b) => (
              <ProductCard key={b.slug} product={b} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY THIS LIBRARY — merged with the old "Designed For Real Life" and
          "Who It's For" sections: one explanation of the library's value and
          writing philosophy instead of three overlapping ones. */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="eyebrow">The Difference</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Why This Wellness Library?
              </h2>
              <p className="mt-4 max-w-sm text-balance text-base leading-relaxed text-ink-600">
                Built to actually get used — practical tools and plain
                language, not another app to manage or another PDF to skim
                once and forget.
              </p>
              <p className="mt-3 max-w-sm text-balance text-sm leading-relaxed text-ink-500">
                We don&apos;t have verified customer testimonials to share
                yet, so instead of inventing any, here&apos;s what every
                guide is actually built around.
              </p>
            </div>
            <div className="divide-y divide-ink-900/8 border-t border-ink-900/8 lg:mt-2">
              {WHY_THIS_LIBRARY.map((w) => (
                <div key={w.title} className="flex items-center gap-5 py-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                    <w.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink-950">{w.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — asymmetric heading row, matching the Library/Carousel pattern */}
      <section id="faq" className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">Questions</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Everything you need to know about the wellness library and your purchase.
              </p>
            </div>
            <Link
              href="/faq"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline sm:inline-flex"
            >
              View All FAQs <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-x-10 sm:grid-cols-2">
            <FAQAccordion items={FAQS.slice(0, 5)} />
            <div className="mt-6 sm:mt-0">
              <FAQAccordion items={FAQS.slice(5, 10)} />
            </div>
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/faq" className="btn-secondary">
              View All FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section-pad">
        <div className="container-page">
          <NewsletterCTA />
        </div>
      </section>

      {/* FINAL CTA */}
      <CTASection />
    </>
  );
}
