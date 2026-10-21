import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChefHat,
  CheckCircle2,
  ClipboardList,
  Gift,
  Leaf,
  ListChecks,
  Lock,
  ShieldCheck,
  Smartphone,
  Sparkles,
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
import CakeCollectionCarousel from "@/components/CakeCollectionCarousel";
import BakingVideoSection from "@/components/BakingVideoSection";
import { PRODUCTS, BONUS_PRODUCTS, STANDALONE_PRODUCTS, BUNDLE_PRICE } from "@/data/products";
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

// Compact benefit row for the new baking introduction — three short,
// concrete claims about what the collection teaches, not generic
// marketing filler. No ratings, certifications, or kitchen-tested claims.
const BAKING_INTRO_FEATURES = [
  { icon: ListChecks, title: "Clear, step-by-step guidance", desc: "Every recipe lists exact quantities, pan sizes, and timing — no guessing at what \"a handful\" or \"a splash\" means." },
  { icon: ChefHat, title: "Practical techniques for home bakers", desc: "Mixing methods, leveling, and troubleshooting explained plainly, built for a home kitchen, not a professional one." },
  { icon: Sparkles, title: "Frosting, decorating & presentation", desc: "From a basic crumb coat to piped flowers and finished celebration cakes, covered step by step." },
];

// Featured in the top-of-page ebook promo strip, below the nav and above
// the main hero. Real product data only — price and cover come straight
// from STANDALONE_PRODUCTS, never hardcoded here.
const TOP_PROMO_EBOOK = STANDALONE_PRODUCTS.find((p) => p.slug === "ultimate-cake-recipe-collection")!;

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

export default function Home() {
  return (
    <>
      <JsonLd data={productJsonLd({ price: BUNDLE_PRICE, path: "/" })} />

      {/* TOP EBOOK PROMO — a compact, premium strip below the nav and above
          the main hero, featuring one real, live product (The Ultimate Cake
          Recipe Collection). Price and cover both come from
          TOP_PROMO_EBOOK/STANDALONE_PRODUCTS, never hardcoded, so this can
          never drift out of sync with the real product data. No invented
          discounts, countdowns, or review claims — just the real $2.99
          offer, presented clearly. */}
      <section className="border-b border-ink-900/8 bg-cream">
        <div className="container-page py-8 sm:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <span className="eyebrow">Baking &amp; Recipes · Digital PDF Ebook</span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-balance text-ink-950 sm:text-4xl">
                Your Next Show-Stopping Cake Starts Here!
              </h2>
              <p className="mt-3 font-display text-lg font-bold text-brand-700">
                Discover 2,400 Cake Recipe Combinations
              </p>
              <p className="mx-auto mt-3 max-w-lg text-balance text-base leading-relaxed text-ink-600 lg:mx-0">
                Explore inspiration for chocolate cakes, vanilla cakes, fruity bakes,
                celebration cakes, and creative flavor combinations — all in one
                digital ebook.
              </p>
              <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href={`/library/${TOP_PROMO_EBOOK.slug}`}
                  className="btn-gold w-full justify-center sm:w-auto"
                >
                  Get the Ebook — ${TOP_PROMO_EBOOK.price!.toFixed(2)} <ArrowRight size={16} />
                </Link>
                <Link
                  href="#cake-collection"
                  className="text-sm font-bold text-brand-700 hover:underline"
                >
                  Explore All Cake &amp; Baking Ebooks
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[220px] lg:max-w-xs">
              <ProductCover
                product={TOP_PROMO_EBOOK}
                className="aspect-[3/4] w-full shadow-lift"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* HERO — full-width photo background with dark overlay, centered headline */}
      <section className="relative overflow-hidden">
        <ResponsiveImage
          imageKey="womanMugPlantsLandscape"
          priority
          className="absolute inset-0 h-full w-full"
          imageClassName="object-[70%_35%]"
          sizes="100vw"
          rounded="rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/65 to-ink-950/80" />
        <div className="container-page relative py-20 text-center sm:py-24 lg:py-28">
          <span className="eyebrow bg-white/15 text-gold-300">The Complete Wellness Library</span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-balance text-white sm:text-5xl lg:text-6xl">
            Your Complete Wellness Library — For Real Life.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-white/85 sm:text-lg">
            Explore practical wellness guides and simple tools designed to
            help you build healthier everyday routines, one small step at
            a time.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/library" className="btn-gold">
              Explore the Wellness Library <ArrowRight size={16} />
            </Link>
            <Link href="/wellness-system" className="btn border-2 border-white/40 text-white hover:bg-white/10">
              Discover the Wellness System
            </Link>
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-white/85">
            {[
              { icon: Zap, label: "Instant digital access" },
              { icon: Smartphone, label: "Works on any device" },
              { icon: Lock, label: "One-time payment" },
            ].map((f) => (
              <span key={f.label} className="flex items-center gap-2">
                <f.icon size={16} className="text-gold-300" /> {f.label}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-white/70">
            Already own a guide?{" "}
            <Link href="/access" className="font-semibold text-gold-300 underline hover:text-gold-200">
              Access Your Wellness System
            </Link>
          </p>
        </div>
      </section>

      {/* STAT STRIP — a distinct editorial band, not nested inside the hero */}
      <section className="border-b border-ink-900/8 bg-brand-50/50">
        <div className="container-page grid grid-cols-2 divide-x divide-y divide-ink-900/8 sm:grid-cols-4 sm:divide-y-0">
          {[
            { icon: BookOpen, count: PRODUCTS.length, label: "Wellness Ebooks" },
            { icon: ClipboardList, count: PRODUCTS.length, label: "Planners" },
            { icon: ListChecks, count: PRODUCTS.length, label: "30-Day Systems" },
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

      {/* CAKE COOKBOOK SPOTLIGHT — full-bleed magazine feature, not a floating card */}
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

      {/* BAKING INTRODUCTION — a compact teaser (not a second full hero)
          that leads straight into the feature row, the video section, and
          then the existing product carousel just below. */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <span className="eyebrow">Baking &amp; Recipes</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Discover Your Next Baking Favorite
              </h2>
              <p className="mt-4 text-balance text-base leading-relaxed text-ink-600">
                Ten standalone baking ebooks covering everyday cakes,
                frosting and decorating technique, cheesecakes and
                cupcakes, cookies and bars, pies and tarts, no-bake
                desserts, and breakfast bakes — plus real video tutorials
                below to go with them.
              </p>
              <div className="mt-7">
                <a href="#cake-collection" className="btn-gold">
                  Browse the Cake &amp; Baking Collection <ArrowRight size={16} />
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <ResponsiveImage
                imageKey="bakingFreshCake"
                className="aspect-[4/5] w-full max-w-sm mx-auto lg:max-w-none"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>
          </div>

          <div className="mt-14 grid gap-8 border-t border-ink-900/8 pt-10 sm:grid-cols-3">
            {BAKING_INTRO_FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <f.icon size={18} />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink-950">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH & LEARN — real, verified Preppy Kitchen tutorials, each
          linked to the matching ebook. See src/data/bakingVideos.ts for the
          verified title/channel/URL for every video. */}
      <BakingVideoSection />

      {/* CAKE & BAKING COLLECTION — all 10 cake/baking ebooks (2 original
          2,400-recipe-combination books + 8 newly written ones) in one
          horizontal carousel, instead of 10 separate oversized sections. */}
      <section id="cake-collection" className="section-pad bg-cream">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">Baking &amp; Recipes</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                The Cake &amp; Baking Collection
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Ten standalone baking ebooks, each $2.99 — cakes, cookies,
                pies, no-bake desserts, and breakfast bakes, from beginner
                technique to advanced decorating.
              </p>
            </div>
            <Link
              href="/library"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline sm:inline-flex"
            >
              View Full Library <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10">
            <CakeCollectionCarousel products={CAKE_BAKING_COLLECTION} />
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/library" className="text-sm font-bold text-brand-700 hover:underline inline-flex items-center gap-1.5">
              View Full Library <ArrowRight size={14} />
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
