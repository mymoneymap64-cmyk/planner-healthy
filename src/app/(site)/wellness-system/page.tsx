import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Circle,
  ClipboardList,
  Heart,
  Home,
  Leaf,
  LineChart,
  Library,
  Link2,
  ListChecks,
  Lock,
  NotebookPen,
  Sparkles,
  StickyNote,
  UtensilsCrossed,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProductCover from "@/components/ProductCover";
import ResponsiveImage from "@/components/ResponsiveImage";
import HeroDeviceMockup from "@/components/wellness-landing/HeroDeviceMockup";
import DemoDashboardUI from "@/components/wellness-landing/DemoDashboardUI";
import { PRODUCTS } from "@/data/products";
import { DETOX_DAYS } from "@/lib/digitalDetox";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HealthyGuide Wellness System | Natural Wellness Library",
  description:
    "Turn your wellness guides into practical daily routines with checklists, personal notes, and progress tracking — the HealthyGuide Wellness System.",
  path: "/wellness-system",
});

const WHAT_YOU_GET_CARDS = [
  {
    emoji: "📖",
    title: "Your Digital Guide",
    desc: "The ebook you purchased, including the practical guidance, routines, and wellness resources inside it.",
  },
  {
    emoji: "🧭",
    title: "Your Interactive Wellness System",
    desc: "Your personal dashboard brings the guide to life with routines, notes, checklists, progress, and saved resources.",
  },
  {
    emoji: "🥗",
    title: "Meal Planner Where Included",
    desc: "When your purchase includes it, you can plan meals, manage meal times, and track your routine in the app.",
  },
  {
    emoji: "📋",
    title: "Planner + 30-Day System",
    desc: "Use the included planner and 30-day system to turn the guide into daily action and build consistency.",
  },
];

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
  { step: "01", title: "Buy Your Guide", desc: "Choose a HealthyGuide ebook or the Complete Library." },
  { step: "02", title: "Get Your Personal Access Link", desc: "After checkout, your personal access link is generated and sent by email." },
  { step: "03", title: "Open Your Wellness System", desc: "Use the link to enter the interactive dashboard and organize your routines, notes, and planning tools." },
];

const VISUAL_JOURNEY = [
  {
    title: "Choose your guide",
    description: "Start with the wellness guide that matches your goals, then open the system created for your purchase.",
    imageKey: "healthyLifestyle",
  },
  {
    title: "Receive your personal access link",
    description: "After checkout, the link arrives by email and opens your private dashboard for your specific purchase.",
    imageKey: "morningRoutineAlt",
  },
  {
    title: "Use your daily plan",
    description: "Open Home, review your plan, and turn your guide into a realistic routine you can return to each day.",
    imageKey: "healthyMealsAlt",
  },
  {
    title: "Track meals, notes, and favorites",
    description: "Save ideas, track meals, and keep the tools you return to most in the same place.",
    imageKey: "mealPrep",
  },
  {
    title: "Keep the routine sustainable",
    description: "Move through your plan with checklists, reminders, and a rhythm that feels realistic rather than overwhelming.",
    imageKey: "walking",
  },
] as const satisfies ReadonlyArray<{
  title: string;
  description: string;
  imageKey:
    | "healthyLifestyle"
    | "healthyLifestyleAlt"
    | "healthyMealsAlt"
    | "morningRoutineAlt"
    | "mealPrep"
    | "walking";
}>;

const ROUTINE_STEPS = [
  "Open your personal access link from your email.",
  "Enter your HealthyGuide Wellness System.",
  "Start from Home and review your daily plan.",
  "Use Checklists to stay organized.",
  "Use Notes and Favorites to save useful information.",
  "Use Meal Planner when your purchase includes it.",
  "Return regularly and build your routine.",
];

const SYSTEM_SECTION_CARDS = [
  {
    icon: Home,
    title: "Home",
    desc: "See today's focus, progress, and a quick overview of your wellness routine.",
  },
  {
    icon: Library,
    title: "My Library",
    desc: "Access the wellness guides connected to your purchase in one organized space.",
  },
  {
    icon: ListChecks,
    title: "Daily Plan",
    desc: "Organize daily wellness tasks and routines so the guidance becomes practical to follow.",
  },
  {
    icon: UtensilsCrossed,
    title: "Meal Planner",
    desc: "Plan meals, manage meal times, track completion, and use the interactive meal-planning tools when included.",
  },
  {
    icon: CheckCircle2,
    title: "Checklists",
    desc: "Create and complete practical wellness checklists that match your guide and routine.",
  },
  {
    icon: NotebookPen,
    title: "Notes",
    desc: "Save personal reflections, reminders, and ideas in one place for easy return.",
  },
  {
    icon: Heart,
    title: "Favorites",
    desc: "Keep useful resources and items easy to revisit whenever you need them.",
  },
];

const PURCHASE_FLOW = [
  "Complete checkout.",
  "Your purchase is recorded.",
  "A personal access link is generated.",
  "The access link is sent by email.",
  "Open the link and enter your Wellness System.",
  "Access your purchased content and available interactive tools.",
];

const PDF_VS_SYSTEM = [
  {
    title: "Traditional PDF",
    items: ["Read", "Print", "Reference"],
  },
  {
    title: "HealthyGuide Wellness System",
    items: ["Organize", "Plan", "Track", "Check off", "Save notes", "Revisit resources"],
  },
];

export default function WellnessSystemPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative grid gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-24">
          <div className="order-2 lg:order-1">
            <HeroDeviceMockup />
          </div>

          <div className="order-1 max-w-xl animate-fadeUp lg:order-2 lg:max-w-none">
            <span className="eyebrow bg-brand-100 text-brand-700">
              <Sparkles size={13} /> HealthyGuide Wellness System
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.08] text-balance text-white sm:text-4xl lg:text-[2.75rem]">
              Your Ebook Comes With More Than a PDF.
            </h1>
            <p className="mt-4 max-w-[38rem] text-balance text-sm leading-relaxed text-ink-200 sm:mt-5 sm:text-base lg:max-w-[34rem]">
              Your HealthyGuide purchase gives you access to an interactive Wellness System designed to help you turn your guide into practical daily routines.
            </p>
            <p className="mt-3 max-w-[38rem] text-balance text-sm leading-relaxed text-ink-300 sm:mt-4 lg:max-w-[32rem]">
              It brings together your digital guide, planning tools, progress tracking, personal notes, and your interactive wellness workspace in one place.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-300/40 bg-brand-100/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-100">
              <span className="h-2 w-2 rounded-full bg-brand-300" />
              Digital guide + interactive system
            </div>

            <div className="mt-8 grid gap-3 text-sm text-ink-200 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-300/20 bg-white/5 p-3 text-brand-50">Digital guide</div>
              <div className="rounded-xl border border-brand-300/20 bg-white/5 p-3 text-brand-50">Interactive Wellness System</div>
              <div className="rounded-xl border border-brand-300/20 bg-white/5 p-3 text-brand-50">Planning tools</div>
              <div className="rounded-xl border border-brand-300/20 bg-white/5 p-3 text-brand-50">Progress tracking</div>
              <div className="rounded-xl border border-brand-300/20 bg-white/5 p-3 text-brand-50">Meal Planner where included</div>
              <div className="rounded-xl border border-brand-300/20 bg-white/5 p-3 text-brand-50">Notes, favorites, checklists</div>
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link href="/wellness-system/demo" className="btn-wellness w-full sm:w-auto">
                Try the Wellness System Demo <ArrowRight size={16} />
              </Link>
              <Link href="/checkout" className="btn w-full border-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                Get the Complete Library
              </Link>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gold-300">
              Explore the dashboard and Interactive Meal Planner before you buy — no account needed.
            </p>

            <p className="mt-6 text-sm text-ink-400">
              Already own a guide?{" "}
              <Link href="/access" className="font-semibold text-gold-300 underline hover:text-gold-200">
                Access your Wellness System
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET WITH YOUR EBOOK */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="One Purchase, Fully Connected"
            title="What You Get With Your Ebook"
            description="Your purchase gives you more than a digital guide. It also gives you access to an interactive wellness system that helps you turn the guide into a practical daily routine."
          />

          {/* Visual relationship: the ebook and the system are one purchase, not two products */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_1.2fr_0.9fr] lg:items-center">
            <div className="text-center">
              <div className="flex -space-x-7 justify-center">
                {PRODUCTS.slice(0, 2).map((p) => (
                  <div key={p.slug} className="w-24 overflow-hidden rounded-lg border-4 border-white shadow-lift sm:w-28">
                    <ProductCover product={p} className="aspect-[3/4] w-full" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-500">Your Digital Guide</p>
            </div>

            <div className="flex justify-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 shadow-soft">
                <Link2 size={20} />
              </span>
            </div>

            <div className="text-center">
              <div className="w-40 overflow-hidden rounded-xl border border-ink-900/10 shadow-lift sm:w-48">
                <DemoDashboardUI variant="laptop" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-500">Your Interactive System</p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-brand-100 bg-ink-50 shadow-soft">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-4 sm:p-6">
                <div className="overflow-hidden rounded-[1.4rem] border border-ink-900/10 bg-white shadow-soft">
                  <ResponsiveImage
                    imageKey="healthyLifestyleAlt"
                    className="h-full min-h-[250px]"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    rounded="rounded-none"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Your guide gives you the knowledge.</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink-950">Your system helps you turn it into a routine.</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">
                  The guide teaches the habit, the checklist helps you follow it, and the dashboard keeps you organized so the learning stays useful in real life.
                </p>
                <div className="mt-6 grid gap-3 text-sm text-ink-700">
                  <div className="rounded-xl border border-ink-900/10 bg-white px-3 py-2">Read the guidance</div>
                  <div className="rounded-xl border border-ink-900/10 bg-white px-3 py-2">Plan your day</div>
                  <div className="rounded-xl border border-ink-900/10 bg-white px-3 py-2">Return to what matters</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_YOU_GET_CARDS.map((c) => (
              <div key={c.title} className="card p-6 text-center">
                <p className="text-3xl" aria-hidden>
                  {c.emoji}
                </p>
                <h3 className="mt-3 font-display text-base font-bold text-ink-950">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-display text-xl font-bold text-balance text-ink-950 sm:text-2xl">
              One purchase. Your guide + your interactive wellness system.
            </p>
            <Link
              href="/wellness-system/demo"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
            >
              See the system before you buy <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW YOUR HEALTHYGUIDE SYSTEM WORKS */}
      <section className="section-pad bg-brand-50">
        <div className="container-page">
          <SectionHeading
            eyebrow="How Your HealthyGuide System Works"
            title="From purchase to daily routine, in a natural rhythm"
            description="A real wellness system should feel simple and human. The journey is designed to help you learn, plan, and return to what matters without extra friction."
          />

          <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
            {VISUAL_JOURNEY.map((item, index) => (
              <div key={item.title} className="overflow-hidden rounded-[1.5rem] border border-brand-200 bg-white shadow-soft">
                <div className="relative h-52 overflow-hidden md:h-56 xl:h-60">
                  <ResponsiveImage
                    imageKey={item.imageKey}
                    className="h-full w-full"
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 100vw"
                    rounded="rounded-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink-950/70 to-transparent px-3 pb-3 pt-8 text-white">
                    <span className="font-display text-lg font-black">0{index + 1}</span>
                    <span className="rounded-full border border-white/30 bg-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em]">
                      Step
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-base font-bold text-ink-950 sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW I USE IT */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="How I Use It"
            title="Your daily wellness routine, made simple"
            description="The best system is the one you actually return to. The flow below matches the real experience after purchase: open your access link, review your plan, and use the tools as part of your routine."
          />

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div className="order-2 overflow-hidden rounded-[1.75rem] border border-ink-900/10 bg-ink-50 p-3 shadow-soft sm:p-4 lg:order-1">
              <div className="overflow-hidden rounded-[1.4rem] border border-ink-900/10 bg-white shadow-soft">
                <DemoDashboardUI variant="laptop" />
              </div>
            </div>
            <div className="order-1 space-y-3 lg:order-2">
              {ROUTINE_STEPS.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-2xl border border-ink-900/10 bg-white p-3.5 shadow-soft sm:gap-4 sm:p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-ink-600 sm:text-base">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE YOUR WELLNESS SYSTEM */}
      <section id="features" className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="What's Inside Your Wellness System"
            title="One dashboard for the guide, your routines, and your progress"
            description="The dashboard is organized around the real sections homeowners and customers use after purchase — not a separate product."
          />
          <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEM_SECTION_CARDS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card card-hover bg-gradient-to-b from-brand-50 to-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700 shadow-soft">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-950">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{desc}</p>
              </div>
            ))}
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

      {/* YOUR 7-DAY OFFLINE RESET */}
      <section className="section-pad bg-detox-sand">
        <div className="container-page">
          <SectionHeading
            eyebrow="New Inside Your Wellness System"
            title="Your 7-Day Offline Reset"
            description="Small daily actions to help you step away from the screen and reconnect with real life — included free with your Wellness System."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 overflow-hidden rounded-[1.75rem] border border-detox-sage/25 bg-white shadow-soft lg:grid-cols-2">
            <div className="relative min-h-[260px]">
              <ResponsiveImage
                imageKey="walking"
                className="h-full min-h-[260px]"
                sizes="(min-width: 1024px) 45vw, 100vw"
                rounded="rounded-none"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <span className="eyebrow bg-detox-sageLight text-detox-forest">
                <Leaf size={13} /> 7-Day Digital Detox
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-950">
                A real, interactive 7-day challenge — not just an article
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Track each day, mark it complete, and watch your progress build — right inside your Wellness
                System dashboard, the same way your Daily Plan and Checklists already work.
              </p>
              <div className="mt-5 space-y-2">
                {DETOX_DAYS.slice(0, 3).map((d) => (
                  <div key={d.day} className="flex items-center gap-3 rounded-lg border border-detox-sage/25 bg-detox-sageLight/30 px-3.5 py-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-detox-forest text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-xs font-semibold text-ink-700">
                      Day {d.day}: {d.title}
                    </span>
                  </div>
                ))}
                <p className="pl-1 text-xs font-semibold text-detox-terracotta">+ 4 more days to go</p>
              </div>
              <Link href="/checkout" className="btn-gold mt-6 w-full justify-center sm:w-auto">
                Get the Complete Library <ArrowRight size={16} />
              </Link>
            </div>
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

      {/* SHOW, DON'T JUST TELL */}
      <section className="section-pad bg-ink-950">
        <div className="container-page">
          <SectionHeading
            dark
            eyebrow="See It In Action"
            title="Home, Daily Plan, Meal Planner, Notes, and more — all in one workspace"
            description="This is what the real Wellness System feels like inside: a practical dashboard for your guide, your routine, and the tools you use to keep moving."
          />
          <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-lift transition-transform duration-500 hover:-translate-y-1">
            <DemoDashboardUI variant="showcase" />
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              "Home dashboard",
              "Daily Plan",
              "Meal Planner",
              "Library",
              "Checklists",
              "Notes",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-ink-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS AFTER YOU BUY */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="What Happens After You Buy"
            title="From checkout to your personal Wellness System"
            description="Use the real access flow. After purchase, the system becomes available through your personal access link."
          />

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-ink-900/10 bg-ink-50 p-6 sm:p-8">
            <ol className="space-y-4">
              {PURCHASE_FLOW.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-ink-600 sm:text-base">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PDF VS WELLNESS SYSTEM */}
      <section className="section-pad bg-brand-950 text-white">
        <div className="container-page">
          <SectionHeading
            dark
            eyebrow="Why It's Different From a PDF"
            title="A guide gives you the info. The Wellness System helps you use it."
            description="The value is in turning guidance into a repeatable routine with organization, planning, and progress tracking."
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
            {PDF_VS_SYSTEM.map((group) => (
              <div key={group.title} className={`rounded-2xl border p-6 ${group.title === "Traditional PDF" ? "border-white/10 bg-white/5" : "border-brand-300/30 bg-brand-900/40"}`}>
                <h3 className="font-display text-xl font-bold text-white">{group.title}</h3>
                <ul className="mt-5 space-y-3 text-sm text-brand-50">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${group.title === "Traditional PDF" ? "bg-gold-400 text-ink-950" : "bg-brand-300 text-brand-900"}`}>
                        {group.title === "Traditional PDF" ? "•" : "✓"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
              Try the Wellness System Demo
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-brand-100 sm:text-lg">
              Explore the dashboard and Interactive Meal Planner before you buy — no account needed. The demo is a preview only; your real system becomes available through your purchase access link.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/wellness-system/demo" className="btn-wellness w-full sm:w-auto">
                Try the Wellness System Demo
                <ArrowRight size={16} />
              </Link>
              <Link href="/checkout" className="btn w-full border-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                Get the Complete Library
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
