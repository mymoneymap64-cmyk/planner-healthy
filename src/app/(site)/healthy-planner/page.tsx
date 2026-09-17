import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  ClipboardList,
  Gift,
  Heart,
  Home,
  Library,
  ListChecks,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import LibraryHeroStack from "@/components/LibraryHeroStack";
import PlannerMockup from "@/components/PlannerMockup";
import PricingCard from "@/components/PricingCard";
import HeroDeviceMockup from "@/components/wellness-landing/HeroDeviceMockup";
import DemoDashboardUI from "@/components/wellness-landing/DemoDashboardUI";
import { PRODUCTS, BONUS_PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Complete Healthy Planner | Natural Wellness Library",
  description:
    "Your complete healthy lifestyle planner — 7 ebooks, 7 matching planners, 7 30-day systems, 2 free bonuses, and the Wellness System to track it all in one place.",
  path: "/healthy-planner",
});

const VALUE_CARDS = [
  { icon: BookOpen, count: PRODUCTS.length, label: "Ebooks" },
  { icon: ClipboardList, count: PRODUCTS.length, label: "Matching Planners" },
  { icon: ListChecks, count: PRODUCTS.length, label: "30-Day Systems" },
  { icon: Gift, count: BONUS_PRODUCTS.length, label: "Free Bonuses" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Plan",
    desc: "Every guide comes with a matching planner — daily pages, trackers, and reflection prompts to turn what you read into a plan.",
  },
  {
    step: "02",
    title: "Practice",
    desc: "Follow the matching 30-day system to build the habit into your routine, week by week, at your own pace.",
  },
  {
    step: "03",
    title: "Track",
    desc: "Use the Wellness System to check off your daily plan, work through checklists, and keep notes — all in one organized place.",
  },
];

// Mirrors the real Wellness System sidebar exactly (src/components/wellness-dashboard/DashboardShell.tsx)
// — a decorative preview of the actual nav, not a separately invented one.
const APP_NAV_ITEMS = [
  { label: "Home", icon: Home, active: true },
  { label: "My Library", icon: Library },
  { label: "Daily Plan", icon: ListChecks },
  { label: "Checklists", icon: CheckSquare },
  { label: "Notes", icon: NotebookPen },
  { label: "Favorites", icon: Heart },
];

const APP_FEATURES = [
  "Daily Plans",
  "Wellness Checklists",
  "Progress Tracking",
  "Notes & Journal",
  "Favorites",
  "Your Wellness Library",
];

const WHO_ITS_FOR = [
  "You want a real planner — not just another PDF to skim once and forget",
  "You're looking for practical routines across mental wellness, sleep, eating, or natural remedies, not scattered advice",
  "You'd rather track your progress in one organized system than juggle notes apps and paper",
  "You want to own your library and your data, with no subscription and no account to manage",
];

export default function HealthyPlannerPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative grid gap-12 py-14 sm:py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="order-2 flex flex-col gap-8 lg:order-1">
            <LibraryHeroStack products={PRODUCTS} />
            <div className="mx-auto w-full max-w-xs">
              <HeroDeviceMockup />
            </div>
          </div>

          <div className="order-1 animate-fadeUp lg:order-2">
            <span className="eyebrow bg-white/10 text-gold-300">
              <Sparkles size={13} /> The Complete Healthy Planner
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-balance text-white sm:text-4xl lg:text-[2.75rem]">
              Your Complete Healthy <span className="text-gold-300">Lifestyle Planner</span> — In One Place
            </h1>
            <p className="mt-5 text-balance text-sm leading-relaxed text-ink-200 sm:text-base">
              Combine planning, healthy routines, habit tracking, and
              practical wellness resources in one organized system — 7
              guides, 7 matching planners, 7 30-day systems, and the
              Wellness System to keep it all on track.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/checkout" className="btn-gold">
                Get the Healthy Planner <ArrowRight size={16} />
              </Link>
              <Link href="#included" className="btn border-2 border-white/20 text-white hover:bg-white/10">
                See What&apos;s Included
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-ink-400">
              <span>Instant access after purchase</span>
              <span>·</span>
              <span>Works on any device</span>
              <span>·</span>
              <span>Secure one-time payment</span>
            </div>

            <p className="mt-5 text-sm text-ink-400">
              Already own it?{" "}
              <Link href="/access" className="font-semibold text-gold-300 underline hover:text-gold-200">
                Access your Wellness System
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* VALUE CARDS */}
      <section className="border-b border-ink-900/10 bg-white py-14">
        <div className="container-page">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {VALUE_CARDS.map((v) => (
              <div key={v.label} className="card card-hover p-5 text-center">
                <v.icon size={20} className="mx-auto text-brand-700" />
                <p className="mt-2 font-display text-2xl font-black text-ink-950">{v.count}</p>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-500">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="included" className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's Included"
            title="Everything in the Complete Healthy Planner"
            description="7 ebooks, 7 matching planners, 7 30-day systems, and 2 free bonus guides — 23 digital resources in one collection, plus the Wellness System to track it all."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Real Planner Pages</span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-950">
                A planner built to actually get used
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Every guide comes with a matching planner — daily planning
                pages, habit trackers, and weekly reflection pages designed
                to turn what you read into a routine you can follow.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-ink-700">
                <li>Daily planning pages</li>
                <li>Habit trackers</li>
                <li>Weekly reflection pages</li>
                <li>A matching 30-day system for every guide</li>
              </ul>
            </div>
            <PlannerMockup />
          </div>

          <div className="mx-auto mt-16 max-w-lg">
            <PricingCard />
          </div>
        </div>
      </section>

      {/* APP SHOWCASE */}
      <section className="section-pad bg-ink-950">
        <div className="container-page">
          <SectionHeading
            dark
            eyebrow="Not Just a PDF"
            title="Your Wellness System, Right at Your Fingertips"
            description="Plan your routines, track your progress, organize your wellness guides, complete checklists, and keep your personal notes — all in one simple system. Shown below with sample preview data, not a real account."
          />

          {/* Desktop/tablet: full browser + sidebar composition, large enough to
              actually read. Hidden below lg rather than shrunk, per the mobile
              requirement below. */}
          <div className="mt-14 hidden lg:block">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-lift">
              <div className="flex items-center gap-3 border-b border-white/10 bg-ink-950 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <div className="flex-1 rounded-md bg-white/5 px-3 py-1 text-center text-[11px] text-ink-400">
                  healthyguide.online/wellness
                </div>
              </div>

              <div className="flex items-stretch">
                <div className="flex w-56 shrink-0 flex-col border-r border-white/10 bg-ink-950 p-4">
                  <div className="flex items-center gap-2 pb-5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white font-display text-xs font-black text-ink-950">
                      N
                    </span>
                    <span className="text-xs font-bold text-white">Natural Wellness</span>
                  </div>
                  <nav className="space-y-1">
                    {APP_NAV_ITEMS.map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                          item.active ? "bg-brand-500/20 text-brand-200" : "text-ink-400"
                        }`}
                      >
                        <item.icon size={14} />
                        {item.label}
                      </div>
                    ))}
                  </nav>
                </div>

                <div className="flex-1">
                  <div className="px-6 pb-1 pt-5">
                    <p className="font-display text-lg font-bold text-white">
                      Good Morning <span aria-hidden>☀️</span>
                    </p>
                    <p className="text-xs text-ink-400">Small steps make a big difference.</p>
                  </div>
                  <DemoDashboardUI variant="showcase" />
                </div>
              </div>
            </div>
          </div>

          {/* Phone preview + real feature list — always shown (the primary
              visual on mobile, secondary/underneath on desktop). */}
          <div className="mx-auto mt-10 grid max-w-3xl items-center gap-10 sm:grid-cols-2">
            <div className="mx-auto w-full max-w-[220px]">
              <div className="overflow-hidden rounded-[1.6rem] border-[6px] border-ink-800 bg-ink-950 shadow-lift">
                <div className="aspect-[9/19] w-full overflow-hidden">
                  <DemoDashboardUI variant="phone" />
                </div>
              </div>
            </div>

            <div>
              <ul className="space-y-3">
                {APP_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-semibold text-white">
                    <CheckCircle2 size={17} className="shrink-0 text-gold-300" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/access" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-200">
                Already own it? Access your Wellness System <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad bg-brand-950 text-white">
        <div className="container-page">
          <SectionHeading dark eyebrow="How It Works" title="Plan. Practice. Track." />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <span className="font-display text-3xl font-black text-brand-300">{s.step}</span>
                <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-100">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gold-50 p-8 sm:p-12">
            <SectionHeading eyebrow="Who It's For" title="The Healthy Planner is built for you if..." align="left" />
            <ul className="mt-8 space-y-4">
              {WHO_ITS_FOR.map((w) => (
                <li key={w} className="flex items-start gap-3 text-base text-ink-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                    <Sparkles size={12} />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-pad bg-brand-900">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl bg-brand-800 px-6 py-14 text-center sm:px-14 sm:py-16">
            <span className="eyebrow bg-white/10 text-gold-300">
              <Sparkles size={13} /> Get Started
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl">
              Ready to Plan a Healthier Life?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-brand-100 sm:text-lg">
              Get the Complete Healthy Planner — 7 guides, 7 planners, 7
              30-day systems, 2 free bonuses, and the Wellness System to
              keep it all organized.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/checkout" className="btn-gold w-full sm:w-auto">
                Get the Healthy Planner
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/access"
                className="btn w-full border-2 border-white/20 text-white hover:bg-white/10 sm:w-auto"
              >
                Access Your Wellness System
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
