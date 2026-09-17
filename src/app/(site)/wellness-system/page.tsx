import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  ClipboardList,
  LineChart,
  Library,
  ListChecks,
  Lock,
  Sparkles,
  StickyNote,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProductCover from "@/components/ProductCover";
import HeroDeviceMockup from "@/components/wellness-landing/HeroDeviceMockup";
import DemoDashboardUI from "@/components/wellness-landing/DemoDashboardUI";
import { PRODUCTS } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HealthyGuide Wellness System | Natural Wellness Library",
  description:
    "Turn your wellness guides into practical daily routines with checklists, personal notes, and progress tracking — the HealthyGuide Wellness System.",
  path: "/wellness-system",
});

const PROBLEM_CARDS = [
  {
    title: "Read with purpose",
    desc: "Open your ebook straight from your workspace, and pick up exactly where you left off instead of hunting through a saved PDF.",
  },
  {
    title: "Plan your routine",
    desc: "Turn what you read into a routine using the matching planner and a simple daily checklist built around that guide.",
  },
  {
    title: "Track your progress",
    desc: "See your reading progress, checklist activity, and saved notes in one place, so you can tell at a glance what you've kept up with.",
  },
];

const FEATURES = [
  {
    icon: ListChecks,
    title: "Daily Checklists",
    desc: "Keep track of simple wellness routines and daily tasks for each guide you own.",
    preview: (
      <div className="mt-5 space-y-2 rounded-lg bg-ink-50 p-3">
        {["Read a section today", "Used one tool from the guide", "Checked in with how I'm feeling"].map(
          (label, i) => (
            <div key={label} className="flex items-center gap-2 text-xs text-ink-600">
              {i < 2 ? (
                <CheckCircle2 size={14} className="shrink-0 text-brand-600" />
              ) : (
                <Circle size={14} className="shrink-0 text-ink-300" />
              )}
              <span className="truncate">{label}</span>
            </div>
          )
        )}
      </div>
    ),
  },
  {
    icon: StickyNote,
    title: "Personal Notes",
    desc: "Save reflections, ideas, reminders, and personal observations in one place for every guide.",
    preview: (
      <div className="mt-5 rounded-lg bg-ink-50 p-3">
        <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Your Notes</p>
        <p className="mt-2 text-xs italic leading-relaxed text-ink-500">
          &ldquo;Felt calmer after the evening wind-down routine — worth repeating this week.&rdquo;
        </p>
      </div>
    ),
  },
  {
    icon: LineChart,
    title: "Progress Overview",
    desc: "See your reading progress and checklist activity together in a simple, honest dashboard.",
    preview: (
      <div className="mt-5 space-y-2.5 rounded-lg bg-ink-50 p-3">
        {[
          { label: "Ebook", value: 62 },
          { label: "Checklist", value: 80 },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-[10px] font-semibold text-ink-500">
              <span>{row.label}</span>
              <span>{row.value}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ink-900/[0.08]">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${row.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Library,
    title: "Your Wellness Library",
    desc: "Access the wellness products included in your purchase from one organized space.",
    preview: (
      <div className="mt-5 flex gap-2">
        {PRODUCTS.slice(0, 3).map((p) => (
          <div key={p.slug} className="w-1/3 overflow-hidden rounded-md shadow-sm">
            <ProductCover product={p} className="aspect-[3/4] w-full" />
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: BookOpenCheck,
    title: "Read & Plan",
    desc: "Open the existing ebook, planner, and 30-day system resources directly from your workspace.",
    preview: (
      <div className="mt-5 grid grid-cols-3 gap-2">
        {["Ebook", "Planner", "System"].map((label) => (
          <div
            key={label}
            className="rounded-md border border-ink-900/10 bg-ink-50 py-3 text-center text-[10px] font-bold text-ink-600"
          >
            {label}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Lock,
    title: "Private Access",
    desc: "Personal dashboards are available only through a valid purchase access token — never public.",
    preview: (
      <div className="mt-5 flex items-center gap-3 rounded-lg bg-ink-50 p-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 text-white">
          <Lock size={15} />
        </span>
        <p className="text-xs leading-snug text-ink-500">Token-protected — only you can open your dashboard.</p>
      </div>
    ),
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Choose your guide", desc: "Pick any guide you own, or your complete library." },
  { step: "02", title: "Open your workspace", desc: "Reach your personal Wellness System from your access page." },
  { step: "03", title: "Check off & take notes", desc: "Complete your daily checklist and save notes as you go." },
  { step: "04", title: "Review your progress", desc: "See how far you've come, and keep moving forward." },
];

export default function WellnessSystemPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative grid gap-12 py-14 sm:py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="order-2 lg:order-1">
            <HeroDeviceMockup />
          </div>

          <div className="order-1 animate-fadeUp lg:order-2">
            <span className="eyebrow bg-white/10 text-gold-300">
              <Sparkles size={13} /> HealthyGuide Wellness System
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-balance text-white sm:text-4xl lg:text-[2.75rem]">
              Your Wellness Journey, Organized in One Place.
            </h1>
            <p className="mt-5 text-balance text-sm leading-relaxed text-ink-200 sm:text-base">
              Turn your wellness guides into practical daily routines with
              checklists, personal notes, progress tracking, and a simple
              system designed to help you stay consistent.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#features" className="btn-gold">
                Explore the Wellness System <ArrowRight size={16} />
              </Link>
              <Link href="/checkout" className="btn border-2 border-white/20 text-white hover:bg-white/10">
                Get the Complete Library
              </Link>
            </div>

            <p className="mt-6 text-sm text-ink-400">
              Already own a guide?{" "}
              <Link href="/access" className="font-semibold text-gold-300 underline hover:text-gold-200">
                Access your Wellness System
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why It Exists"
            title="Your Guides Are Helpful. Your System Makes Them Actionable."
            description="A PDF can teach you something valuable, but it can't remind you to use it. The Wellness System sits alongside every guide you own, helping you organize what you're learning and turn it into simple daily actions — it isn't a treatment, a diagnosis, or a promise of results."
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-3">
            {PROBLEM_CARDS.map((p) => (
              <div key={p.title} className="card card-hover p-6">
                <h3 className="font-display text-lg font-bold text-ink-950">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's Inside"
            title="Everything you need to stay consistent"
            description="Simple, honest tools that work alongside your guides — nothing invented, nothing that isn't already part of the library you own."
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card card-hover p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                  <f.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-950">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.desc}</p>
                {f.preview}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad bg-brand-950 text-white">
        <div className="container-page">
          <SectionHeading dark eyebrow="How It Works" title="A Simpler Way to Build Your Routine" />

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="pointer-events-none absolute left-[19px] top-0 h-full w-px bg-white/15 sm:left-0 sm:top-[19px] sm:h-px sm:w-full" />
            <div className="grid gap-8 sm:grid-cols-4 sm:gap-6">
              {HOW_IT_WORKS.map((s) => (
                <div key={s.step} className="relative flex items-start gap-4 sm:flex-col sm:items-start sm:gap-0">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-sm font-black text-ink-950">
                    {s.step}
                  </span>
                  <div className="sm:mt-5">
                    <h3 className="font-display text-base font-bold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-100">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section className="section-pad bg-ink-950">
        <div className="container-page">
          <SectionHeading
            dark
            eyebrow="See It In Action"
            title="See Your Wellness Journey at a Glance"
            description="A realistic look at what your personal dashboard organizes — built with fictional demo data, not a real account."
          />
          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-lift transition-transform duration-500 hover:-translate-y-1">
            <DemoDashboardUI variant="showcase" />
          </div>
        </div>
      </section>

      {/* LIBRARY CONNECTION */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Connected to the Library"
            title="Works With Every Guide You Own"
            description="The Wellness System isn't a separate product — it's organized directly around the 7 guides in the Natural Wellness Library."
          />
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-4">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                href={`/library/${p.slug}`}
                className="group flex flex-col items-center transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-full overflow-hidden rounded-lg shadow-soft transition-shadow duration-300 group-hover:shadow-lift">
                  <ProductCover product={p} className="aspect-[3/4] w-full" />
                </div>
                <p className="mt-3 text-center text-xs font-semibold leading-snug text-ink-700 group-hover:text-brand-700">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/library" className="btn-secondary">
              Browse the Full Library <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-pad bg-brand-900">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl bg-brand-800 px-6 py-14 text-center sm:px-14 sm:py-16">
            <span className="eyebrow bg-white/10 text-gold-300">
              <ClipboardList size={13} /> Get Started
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl">
              Make Your Wellness Resources Work for You.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-brand-100 sm:text-lg">
              Explore the HealthyGuide Wellness System and bring your
              reading, planning, and daily progress together in one
              organized experience.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/checkout" className="btn-gold w-full sm:w-auto">
                Get the Complete Library
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
