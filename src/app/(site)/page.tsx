import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Leaf,
  ListChecks,
  Quote,
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
import PlannerMockup from "@/components/PlannerMockup";
import NewsletterCTA from "@/components/NewsletterCTA";
import JsonLd from "@/components/JsonLd";
import ResponsiveImage from "@/components/ResponsiveImage";
import ProductCarousel from "@/components/ProductCarousel";
import { PRODUCTS, BONUS_PRODUCTS, STANDALONE_PRODUCTS, BUNDLE_PRICE } from "@/data/products";
import { FAQS } from "@/data/faq";
import { buildMetadata, productJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Premium Wellness Ebooks, Planners & 30-Day Wellness Systems | Natural Wellness Library",
  description:
    "A curated collection of 7 premium wellness ebooks — natural healing, mental wellness, women's and men's wellness, herbal recipes, sleep & recovery, and healthy eating — each with a matching wellness planner and 30-day wellness system.",
  path: "/",
});

const MORE_THAN_A_PDF_BENEFITS = [
  {
    number: "01",
    title: "Digital Guide",
    desc: "Practical wellness information you can read anytime.",
  },
  {
    number: "02",
    title: "Interactive Wellness System",
    desc: "Use your personal access link to enter your private system and turn the guide into daily actions.",
  },
  {
    number: "03",
    title: "Simple Wellness Tools",
    desc: "Daily plans, checklists, notes, favorites, and included tools such as the Meal Planner where applicable.",
  },
];

const HOW_IT_WORKS = [
  { icon: BookOpen, step: "01", title: "Learn", role: "Ebook", desc: "Read the guide to understand the why behind each habit — practical, plain-language information you can actually use." },
  { icon: ClipboardList, step: "02", title: "Plan", role: "Planner", desc: "Use the matching planner to turn what you learned into a concrete daily and weekly plan." },
  { icon: ListChecks, step: "03", title: "Apply", role: "30-Day System", desc: "Follow the 30-day system to build the habit into your routine, week by week." },
];

const WHY_THIS_LIBRARY = [
  { icon: BookOpen, title: "More than ebooks", desc: "Most digital guides are just PDFs. Every core guide here pairs an ebook with a matching planner and a 30-day system — learn, plan, and apply in one purchase." },
  { icon: Leaf, title: "Practical over theoretical", desc: "Each guide focuses on information you can actually use, organized so you can find what you need without reading the whole thing front to back." },
  { icon: Smartphone, title: "No app, no account, no subscription", desc: "Every guide is a plain digital PDF that works on any device. Pay once, keep it forever — nothing to install." },
  { icon: ShieldCheck, title: "No exaggerated claims", desc: "These are practical, educational wellness guides — not medical advice, and not a promise of specific results." },
];

const WHATS_INCLUDED = [
  { icon: BookOpen, label: "Full Ebook", desc: "The complete guide, written in plain, practical language." },
  { icon: ClipboardList, label: "Matching Planner", desc: "Daily pages, trackers, and reflection prompts for the topic." },
  { icon: ListChecks, label: "30-Day System", desc: "A week-by-week structure to apply what you learn." },
  { icon: Zap, label: "Instant Digital Access", desc: "Available right after checkout — no shipping, no waiting." },
];

const SYSTEM_WEEKS = [
  { label: "Week 1", desc: "Getting started" },
  { label: "Week 2", desc: "Building momentum" },
  { label: "Week 3", desc: "Strengthening consistency" },
  { label: "Week 4", desc: "Locking the habit in" },
  { label: "Days 29–30", desc: "Review & plan ahead" },
];

const WHO_ITS_FOR = [
  "You want practical wellness guidance in one place instead of scattered across the internet",
  "You're interested in mental wellness, women's or men's wellness, or natural remedies and want a real reference, not a listicle",
  "You want a planner and a 30-day system, not just another PDF to skim once and forget",
  "You'd rather own a library of guides than pay for another app or subscription",
];

const CAKE_COOKBOOK = STANDALONE_PRODUCTS.find((p) => p.slug === "the-cake-cookbook")!;

export default function Home() {
  return (
    <>
      <JsonLd data={productJsonLd({ price: BUNDLE_PRICE, path: "/" })} />

      {/* HERO — asymmetric column ratio, top-aligned text against a taller, dominant photo */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-cream to-cream">
        <div className="container-page relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.3fr] lg:items-start lg:gap-16 lg:py-24">
          <div className="order-2 lg:order-1 lg:pt-10">
            <span className="eyebrow">The Complete Wellness Library</span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-balance text-ink-950 sm:text-6xl lg:text-[4.25rem]">
              Your Complete Wellness Library — For Real Life.
            </h1>
            <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-ink-600">
              Explore practical wellness guides and simple tools designed to
              help you build healthier everyday routines, one small step at
              a time.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/library" className="btn-gold">
                Explore the Wellness Library <ArrowRight size={16} />
              </Link>
              <Link href="/wellness-system" className="btn-secondary">
                Discover the Wellness System
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-ink-500">
              <span>Instant digital access</span>
              <span>·</span>
              <span>Works on any device</span>
              <span>·</span>
              <span>One-time payment</span>
            </div>

            <p className="mt-5 text-sm text-ink-500">
              Already own a guide?{" "}
              <Link href="/access" className="font-semibold text-brand-700 underline hover:text-brand-800">
                Access Your Wellness System
              </Link>
            </p>
          </div>

          <div className="order-1 lg:order-2 lg:relative lg:mr-[calc((100vw-100%)/-2)]">
            <ResponsiveImage
              imageKey="personPlanningMorning"
              priority
              className="h-[320px] w-full sm:h-[440px] lg:h-[640px]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              rounded="rounded-[2rem] lg:rounded-r-none lg:rounded-l-[2.5rem]"
            />
          </div>
        </div>
      </section>

      {/* STAT STRIP — a distinct editorial band, not nested inside the hero */}
      <section className="border-b border-ink-900/8 bg-white">
        <div className="container-page grid grid-cols-2 divide-x divide-y divide-ink-900/8 sm:grid-cols-4 sm:divide-y-0">
          {[
            { count: PRODUCTS.length, label: "Wellness Ebooks" },
            { count: PRODUCTS.length, label: "Planners" },
            { count: PRODUCTS.length, label: "30-Day Systems" },
            { count: BONUS_PRODUCTS.length, label: "Free Bonuses" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center justify-center gap-1 px-4 py-8 text-center sm:py-10">
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

      {/* EBOOK CAROUSEL — asymmetric heading row instead of a centered block */}
      <section className="section-pad bg-cream">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">The Shop</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Explore Our Wellness Library
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Practical guides and beautiful resources to support healthier everyday routines.
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
            <ProductCarousel products={[...PRODUCTS, ...STANDALONE_PRODUCTS]} />
          </div>
        </div>
      </section>

      {/* CAKE COOKBOOK SPOTLIGHT — full-bleed magazine feature, not a floating card */}
      <section className="relative overflow-hidden bg-gold-50">
        <div className="container-page grid items-center gap-8 py-14 sm:py-16 lg:grid-cols-[0.9fr_1.3fr] lg:gap-0 lg:py-0">
          <div className="relative mx-auto flex w-full max-w-[260px] justify-center py-2 sm:max-w-[300px] lg:max-w-none lg:py-24">
            <div className="pointer-events-none absolute inset-0 -z-10 m-auto h-[75%] w-[75%] rounded-full bg-gold-200/50 blur-3xl" />
            <div className="w-full max-w-[280px] lg:max-w-[340px] lg:-rotate-2">
              <ProductCover product={CAKE_COOKBOOK} className="aspect-[3/4] w-full shadow-lift" />
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
            </div>
          </div>
        </div>
      </section>

      {/* MORE THAN A PDF — image on the left this time, numbers run horizontally under a rule */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <ResponsiveImage
                imageKey="personPlanningMorning"
                className="h-[300px] w-full sm:h-[400px] lg:h-[540px]"
                sizes="(min-width: 1024px) 45vw, 100vw"
                rounded="rounded-[2rem]"
              />
            </div>

            <div className="order-1 lg:order-2">
              <span className="eyebrow">More Than a PDF</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Your Ebook Comes With More Than a PDF.
              </h2>
              <p className="mt-4 text-balance text-base leading-relaxed text-ink-600">
                Your HealthyGuide purchase gives you practical wellness knowledge plus an interactive Wellness
                System designed to help you turn what you learn into a routine you can actually follow.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 border-t border-ink-900/8 pt-7 sm:grid-cols-3 sm:gap-5">
                {MORE_THAN_A_PDF_BENEFITS.map((b) => (
                  <div key={b.number}>
                    <span className="font-display text-xl font-black text-brand-300">{b.number}</span>
                    <p className="mt-1.5 font-display text-sm font-bold text-ink-950">{b.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-500">{b.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
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
          <SectionHeading
            eyebrow="How It Works"
            title="Learn. Plan. Apply."
            description="For every core guide: the ebook teaches it, the planner plans it, the 30-day system helps you apply it."
            align="left"
          />
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute left-[26px] top-[26px] hidden h-px w-[calc(100%-52px)] bg-brand-200 sm:block" />
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

      {/* PROBLEM */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Sound Familiar?"
            title="Wellness information is everywhere. A reliable library isn't."
            description="Most people don't struggle to find wellness advice — they struggle to find advice that's organized, practical, and trustworthy in one place."
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              { title: "Scattered across the internet", desc: "Bits of advice spread across dozens of sites, with no clear place to start or return to." },
              { title: "Inconsistent quality", desc: "Hard to tell which sources are practical and which are just filler content." },
              { title: "Nothing to keep", desc: "Articles and social posts disappear or get buried — a library you own doesn't." },
            ].map((p) => (
              <div key={p.title} className="card p-6">
                <h3 className="font-display text-lg font-bold text-ink-950">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIBRARY GRID */}
      <section id="library" className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Wellness Library"
            title={`${PRODUCTS.length} practical guides. One complete wellness collection.`}
            description="Buy any guide individually, or get the complete library as one bundle below."
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLE OFFER */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Best Value" title="Get the Complete Wellness Library" />
          <div className="mt-14">
            <PricingCard />
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="What's Included" title="Everything in every core guide" />
          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {WHATS_INCLUDED.map((item) => (
              <div key={item.label} className="flex items-center gap-4 rounded-xl border border-ink-900/10 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <item.icon size={20} />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink-950">{item.label}</p>
                  <p className="text-xs text-ink-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANNER SPOTLIGHT */}
      <section id="planner" className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Included With Every Guide</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
                Your Bonus Planner
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Turn what you learn into a routine you can actually follow.
              </p>
              <ul className="mt-6 space-y-2.5">
                {["Daily planning pages", "Trackers", "Reflection pages", "Habit tracking", "Weekly reviews"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/library" className="btn-secondary mt-6">
                Browse the Library <ArrowRight size={16} />
              </Link>
            </div>
            <PlannerMockup />
          </div>
        </div>
      </section>

      {/* 30-DAY SYSTEM SPOTLIGHT */}
      <section id="system" className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Included With Every Guide"
            title="Your 30-Day System"
            description="Turn knowledge into consistent action with a simple 30-day structure."
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {SYSTEM_WEEKS.map((w) => (
              <div key={w.label} className="rounded-lg border border-ink-900/10 bg-white p-4 text-center">
                <p className="font-display text-sm font-bold text-ink-950">{w.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{w.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/library" className="btn-secondary">
              Browse the Library <ArrowRight size={16} />
            </Link>
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

      {/* WHY THIS LIBRARY */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="The Difference" title="More Than Ebooks" />
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
            {WHY_THIS_LIBRARY.map((w) => (
              <div key={w.title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <w.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-950">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gold-50 p-8 sm:p-12">
            <SectionHeading eyebrow="Who It's For" title="This library is built for you if..." align="left" />
            <ul className="mt-8 space-y-4">
              {WHO_ITS_FOR.map((w) => (
                <li key={w} className="flex items-start gap-3 text-base text-ink-700">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-gold-600" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DESIGNED FOR REAL LIFE — pull-quote statement beside a divided list, not a 3-card grid */}
      <section className="section-pad bg-ink-50/50">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <span className="eyebrow">Designed For Real Life</span>
              <Quote className="mt-6 text-brand-200" size={40} />
              <h2 className="mt-3 max-w-sm font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Built to actually get used.
              </h2>
              <p className="mt-4 max-w-sm text-balance text-base leading-relaxed text-ink-600">
                We don&apos;t have verified customer testimonials to share yet, so
                instead of inventing any, here&apos;s what every guide is built
                around.
              </p>
            </div>

            <div className="divide-y divide-ink-900/8 border-t border-ink-900/8 lg:mt-4">
              {[
                { title: "Realistic, not extreme", desc: "No fad rules or all-or-nothing systems — habits you can keep up with a normal, busy life." },
                { title: "Plain language", desc: "Written to be read and used, not decoded — no filler, no jargon." },
                { title: "Structured, not vague", desc: "A planner and 30-day system to apply what you read, not just another guide you skim once." },
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

      {/* FAQ */}
      <section id="faq" className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="mx-auto mt-14 grid max-w-5xl gap-x-10 sm:grid-cols-2">
            <FAQAccordion items={FAQS.slice(0, 5)} />
            <div className="mt-6 sm:mt-0">
              <FAQAccordion items={FAQS.slice(5, 10)} />
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/faq" className="btn-secondary">
              View Full FAQ <ArrowRight size={16} />
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
