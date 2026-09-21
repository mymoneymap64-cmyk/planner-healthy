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
import PricingCard from "@/components/PricingCard";
import LibraryHeroStack from "@/components/LibraryHeroStack";
import PlannerMockup from "@/components/PlannerMockup";
import NewsletterCTA from "@/components/NewsletterCTA";
import JsonLd from "@/components/JsonLd";
import { PRODUCTS, BONUS_PRODUCTS, BUNDLE_PRICE } from "@/data/products";
import { FAQS } from "@/data/faq";
import { buildMetadata, productJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Premium Wellness Ebooks, Planners & 30-Day Wellness Systems | Natural Wellness Library",
  description:
    "A curated collection of 7 premium wellness ebooks — natural healing, mental wellness, women's and men's wellness, herbal recipes, sleep & recovery, and healthy eating — each with a matching wellness planner and 30-day wellness system.",
  path: "/",
});

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

export default function Home() {
  return (
    <>
      <JsonLd data={productJsonLd({ price: BUNDLE_PRICE, path: "/" })} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative grid gap-10 py-14 sm:py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="order-2 lg:order-1">
            <LibraryHeroStack products={PRODUCTS} />
          </div>

          <div className="order-1 lg:order-2">
            <span className="eyebrow bg-white/10 text-gold-300">The Complete Wellness Library</span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-balance text-white sm:text-4xl lg:text-[2.75rem]">
              Your Complete Wellness Library — In One Place
            </h1>
            <p className="mt-5 text-balance text-sm leading-relaxed text-ink-200 sm:text-base">
              Explore a curated collection of practical wellness guides
              designed to help you build better routines, nourish your body,
              support your wellbeing, improve recovery, and make healthy
              habits easier to maintain.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { count: PRODUCTS.length, label: "Wellness Ebooks" },
                { count: PRODUCTS.length, label: "Planners" },
                { count: PRODUCTS.length, label: "30-Day Systems" },
                { count: BONUS_PRODUCTS.length, label: "Free Bonuses" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-center">
                  <p className="font-display text-xl font-black text-white">{s.count}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ink-300">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/checkout" className="btn-gold">
                Get the Complete Library <ArrowRight size={16} />
              </Link>
              <Link href="#included" className="btn border-2 border-white/20 text-white hover:bg-white/10">
                See What&apos;s Included
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-ink-400">
              <span>Instant digital access</span>
              <span>·</span>
              <span>Works on any device</span>
              <span>·</span>
              <span>${BUNDLE_PRICE} one-time payment</span>
            </div>

            <p className="mt-5 text-sm text-ink-400">
              Already own a guide?{" "}
              <Link href="/access" className="font-semibold text-gold-300 underline hover:text-gold-200">
                Access Your Wellness System
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE — CATEGORIES */}
      <section id="included" className="border-b border-ink-900/10 bg-white py-8">
        <div className="container-page">
          <p className="text-center text-xs font-bold uppercase tracking-wide text-ink-400">What&apos;s Inside</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={`/library/${p.slug}`}
                className="flex items-center gap-2 rounded-full border border-ink-900/10 bg-cream px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-700 transition-colors hover:border-ink-900/30 hover:bg-ink-50"
              >
                {p.categoryLabel}
              </Link>
            ))}
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

      {/* HOW IT WORKS — LEARN / PLAN / APPLY */}
      <section id="how-it-works" className="section-pad bg-brand-950 text-white">
        <div className="container-page">
          <SectionHeading
            dark
            eyebrow="How It Works"
            title="Learn. Plan. Apply."
            description="For every core guide: the ebook teaches it, the planner plans it, the 30-day system helps you apply it."
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <span className="font-display text-3xl font-black text-brand-300">{s.step}</span>
                <span className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gold-300">
                  <s.icon size={18} />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                <p className="text-xs font-bold uppercase tracking-wide text-gold-300">{s.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-brand-100">{s.desc}</p>
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

      {/* DESIGNED FOR REAL LIFE — honest, no fake testimonials */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Designed For Real Life"
            title="Built to actually get used"
            description="We don't have verified customer testimonials to share yet, so instead of inventing any, here's what every guide is built around."
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
            {[
              { title: "Realistic, not extreme", desc: "No fad rules or all-or-nothing systems — habits you can keep up with a normal, busy life." },
              { title: "Plain language", desc: "Written to be read and used, not decoded — no filler, no jargon." },
              { title: "Structured, not vague", desc: "A planner and 30-day system to apply what you read, not just another guide you skim once." },
            ].map((p) => (
              <div key={p.title} className="card p-6">
                <Quote className="text-brand-200" size={24} />
                <h3 className="mt-3 font-display text-base font-bold text-ink-950">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{p.desc}</p>
              </div>
            ))}
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
