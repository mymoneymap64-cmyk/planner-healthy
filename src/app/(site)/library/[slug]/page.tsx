import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Eye,
  ListChecks,
  Printer,
  Settings2,
  ShoppingCart,
  TrendingUp,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import ProductCover from "@/components/ProductCover";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import FAQAccordion from "@/components/FAQAccordion";
import MealPlannerPreview from "@/components/MealPlannerPreview";
import { ALL_PRODUCTS, PRODUCTS, STANDALONE_PRODUCTS, getProduct } from "@/data/products";
import { buildMetadata, breadcrumbJsonLd, productDetailJsonLd, SITE_URL } from "@/lib/seo";
import { FaqItem } from "@/lib/types";

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

/**
 * Search-intent title/description per product, built around the real
 * product topic — not stuffed, one or two natural phrase variants each.
 */
const SEO_COPY: Record<string, { title: string; description: string }> = {
  "natural-healing-handbook": {
    title: "The Natural Healing Handbook — Natural Healing Ebook & Wellness Guide",
    description:
      "A practical natural healing ebook and wellness guide with herbal recipes and everyday remedies, plus a built-in planner and 30-day system. Instant digital access.",
  },
  "mental-wellness-guide": {
    title: "Mental Wellness Guide — Ebook, Wellness Planner & 30-Day System",
    description:
      "A practical mental wellness ebook and guide with mindset tools, a matching wellness planner, and a 30-day system for calmer, steadier days.",
  },
  "womens-wellness-guide": {
    title: "Women's Wellness Guide — Ebook, Planner & 30-Day System",
    description:
      "A women's wellness guide and ebook covering hormone balance, self-care, and nutrition, with a matching women's wellness planner and 30-day system.",
  },
  "mens-wellness-guide": {
    title: "Men's Wellness Guide — Ebook, Planner & 30-Day System",
    description:
      "A men's wellness ebook and guide focused on strength, energy, and long-term health, with a matching men's wellness planner and 30-day system.",
  },
  "natural-remedies-herbal-recipes": {
    title: "Natural Remedies & Herbal Recipes — Herbal Wellness Ebook & Guide",
    description:
      "A natural remedies ebook and herbal recipes guide with simple, ingredient-based recipes, plus a matching planner and 30-day system.",
  },
  "sleep-recovery-handbook": {
    title: "Sleep & Recovery Handbook — Sleep Guide Ebook & Planner",
    description:
      "A sleep recovery guide and ebook with wind-down routines, a matching sleep planner, and a 30-day system for better rest.",
  },
  "healthy-eating-guide": {
    title: "Healthy Eating Guide — Ebook & Healthy Meal Planner",
    description:
      "A healthy eating ebook and guide with balanced meal guidance, a matching healthy meal planner, and a 30-day system.",
  },
  "the-cake-cookbook": {
    title: "The Cake Cookbook | 40 Easy Homemade Cake Recipes",
    description:
      "Discover The Cake Cookbook with 40 delicious homemade cake recipes, plus 5 easy frostings and glazes for birthdays, holidays, and everyday baking.",
  },
  "complete-guide-home-food-preservation": {
    title: "The Complete Guide to Home Food Preservation | HealthyGuide",
    description:
      "200 illustrated, beginner-friendly recipes for canning, pickling, jams, jellies, sauces, drying, freezing, and pantry storage — plus equipment guidance, food-safety information, and reference charts.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return buildMetadata({ title: "Not Found", description: "", path: "/library", noindex: true });

  const seo = SEO_COPY[product.slug];

  return buildMetadata({
    title: seo ? `${seo.title} | Natural Wellness Library` : `${product.title} | Natural Wellness Library`,
    description: seo?.description ?? product.description,
    path: `/library/${product.slug}`,
    imageUrl: product.coverImage ? `${SITE_URL}${product.coverImage}` : undefined,
  });
}

const SYSTEM_WEEKS = [
  { label: "Week 1", desc: "Getting started — build the foundation" },
  { label: "Week 2", desc: "Building momentum with your new routine" },
  { label: "Week 3", desc: "Strengthening consistency" },
  { label: "Week 4", desc: "Locking the habit in" },
  { label: "Days 29–30", desc: "Review and plan what comes next" },
];

// Healthy Eating Guide only — the Interactive Meal Planner is a universal
// Wellness Dashboard feature (every order gets it), but this is the one
// product page where it's the headline story.
const MEAL_PLANNER_FEATURES = [
  { icon: BookOpen, label: "Healthy Eating Guide", detail: "Practical digital guide with simple wellness and eating-planning information." },
  { icon: UtensilsCrossed, label: "Interactive Meal Planner", detail: "Plan your meals by day and time, track completion, and organize your routine." },
  { icon: CalendarDays, label: "Weekly Meal Planner", detail: "Plan breakfast, lunch, snacks, and dinner across the week." },
  { icon: ShoppingCart, label: "Grocery List", detail: "Build your grocery list from your planned meals or add items manually." },
  { icon: ClipboardList, label: "Prep Ahead Checklist", detail: "Organize simple preparation tasks before the week starts." },
  { icon: TrendingUp, label: "30-Day Progress", detail: "Track your planning routine across 30 days." },
  { icon: Printer, label: "Printable Plan", detail: "Print or save your personalized plan for offline use." },
];

const MEAL_PLANNER_HOW_IT_WORKS = [
  { icon: Settings2, title: "Set Up Your Routine", desc: "Choose your wake time, bedtime, meals, and preferences." },
  { icon: UtensilsCrossed, title: "Plan Your Meals", desc: "Organize today's meals and your weekly plan." },
  { icon: ListChecks, title: "Stay Organized", desc: "Track meals, groceries, preparation, and 30-day progress." },
];

const MEAL_PLANNER_FAQ: FaqItem[] = [
  {
    question: "Is the Meal Planner a PDF?",
    answer:
      "No. The Meal Planner is an interactive web-based tool. You can plan meals, edit times, track progress, manage groceries, and use the printable version when you want a paper copy.",
  },
  {
    question: "Can I use it on my phone?",
    answer: "Yes. The planner is designed to work on mobile, tablet, and desktop.",
  },
  {
    question: "Do I need to install an app?",
    answer: "No. It runs in your web browser, so there is nothing to install.",
  },
  {
    question: "Can I print my plan?",
    answer: "Yes. The planner includes a print-friendly version of your plan.",
  },
  {
    question: "Is this medical advice?",
    answer: "No. The Healthy Eating Planner is a general wellness and organization tool and is not medical advice.",
  },
];

const PRESERVATION_CHAPTERS = [
  { number: "01", title: "Canned Vegetables" },
  { number: "02", title: "Canned Fruits" },
  { number: "03", title: "Pickles & Relishes" },
  { number: "04", title: "Jams & Jellies" },
  { number: "05", title: "Sauces & Salsas" },
  { number: "06", title: "Chutneys & Condiments" },
  { number: "07", title: "Dried & Dehydrated Foods" },
  { number: "08", title: "Freezer Recipes" },
  { number: "09", title: "Pantry & Long-Term Storage" },
  { number: "10", title: "Preserved Meal Components" },
];

const PRESERVATION_REFERENCE_ITEMS = [
  "Getting Started & food preservation basics",
  "Equipment, water-bath & pressure canning guidance",
  "Food safety & botulism guidance",
  "Altitude adjustments & reference charts",
  "Storage life & troubleshooting guides",
  "Seasonal produce buying guide",
  "Full recipe index",
];

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  // Wellness core guides keep their existing cross-sell (recommend the other
  // wellness guides). A standalone product like the cookbook isn't part of
  // that collection, so it only ever recommends other standalone products
  // in the same category — which correctly shows nothing today rather than
  // incongruously recommending wellness ebooks on a cookbook page.
  const isWellnessCoreGuide = PRODUCTS.some((p) => p.slug === product.slug);
  const related = isWellnessCoreGuide
    ? PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3)
    : STANDALONE_PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const integrated = product.plannerAndSystemIncludedInEbook;
  const hasPlanner = Boolean(product.plannerPdf) || Boolean(integrated);
  const hasSystem = Boolean(product.systemPdf) || Boolean(integrated);
  const isHealthyEating = product.slug === "healthy-eating-guide";
  const isFoodPreservation = product.slug === "complete-guide-home-food-preservation";

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Library", path: "/library" },
          { name: product.title, path: `/library/${product.slug}` },
        ])}
      />
      <JsonLd
        data={productDetailJsonLd({
          title: product.title,
          description: product.description,
          path: `/library/${product.slug}`,
          imageUrl: product.coverImage ? `${SITE_URL}${product.coverImage}` : undefined,
          price: product.price,
        })}
      />
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative py-10 sm:py-12">
          <Breadcrumbs
            dark
            items={[
              { name: "Library", href: "/library" },
              { name: product.title, href: `/library/${product.slug}` },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="mx-auto w-full max-w-xs lg:mx-0">
              <ProductCover product={product} className="aspect-[3/4] w-full" priority />
            </div>

            <div>
              <span className="eyebrow bg-white/10 text-gold-300">{product.categoryLabel}</span>
              <h1 className="mt-5 font-display text-3xl font-bold text-balance text-white sm:text-4xl">
                {isHealthyEating
                  ? "Build a Healthier Eating Routine — One Simple Day at a Time"
                  : product.marketingHeadline ?? product.title}
              </h1>
              {product.marketingHeadline && !isHealthyEating && (
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-gold-300">
                  {product.title}
                </p>
              )}
              {isHealthyEating && (
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-gold-300">
                  {product.title} + Interactive Meal Planner
                </p>
              )}
              <p className="mt-3 text-balance text-base leading-relaxed text-ink-300">
                {isHealthyEating
                  ? "Get the Healthy Eating Guide plus an interactive meal planner that helps you organize your meals, plan your week, build a grocery list, and track your 30-day routine."
                  : product.marketingSubheadline ?? product.subtitle}
              </p>

              {product.benefits.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-200">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-gold-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {hasPlanner && hasSystem && !isHealthyEating && (
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-gold-300">
                  Ebook + Planner + 30-Day System
                </p>
              )}

              <div className="mt-4 inline-flex flex-col gap-3 rounded-xl border border-gold-400/25 bg-white/5 px-5 py-4">
                {product.price !== null && product.price > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-gold-300">Launch Offer</span>
                    {product.compareAtPrice != null && product.compareAtPrice > product.price && (
                      <span className="rounded-full bg-gold-400 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-ink-950">
                        Save {Math.round(100 - (product.price / product.compareAtPrice) * 100)}%
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap items-end gap-5">
                  {product.price === null ? (
                    <span className="font-display text-2xl font-black text-white">Price coming soon</span>
                  ) : product.price === 0 ? (
                    <span className="font-display text-2xl font-black text-white">Free</span>
                  ) : (
                    <>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Launch Price</p>
                        <span className="font-display text-5xl font-black leading-none text-white">
                          ${product.price}
                        </span>
                      </div>
                      {product.compareAtPrice != null && (
                        <div className="pb-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-ink-400">Guide Value</p>
                          <span className="text-base font-medium text-ink-400 line-through decoration-ink-500">
                            ${product.compareAtPrice}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                  {product.pageCount !== null && (
                    <span className="pb-1 text-sm text-ink-400">{product.pageCount} pages</span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                {product.ebookPdf && (
                  <a
                    href={product.ebookPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn border-2 border-white/20 text-white hover:bg-white/10"
                  >
                    <Eye size={16} /> Preview
                  </a>
                )}
                <Link
                  href={product.isBonus ? "/checkout" : `/checkout/${product.slug}`}
                  className="btn-gold"
                >
                  {isHealthyEating ? "Get the Healthy Eating Guide" : product.isBonus ? "Get Instant Access" : "Get This Guide"}{" "}
                  <ArrowRight size={16} />
                </Link>
              </div>
              {isHealthyEating && (
                <p className="mt-3 text-xs font-semibold text-gold-300">
                  Digital access • Interactive planner • Printable resources
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET — Healthy Eating Guide gets its own richer version below */}
      {isHealthyEating ? (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="What You Get"
              title="Everything You Need to Plan Your Eating Routine"
              align="left"
            />
            <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MEAL_PLANNER_FEATURES.map((item) => (
                <div key={item.label} className="flex items-start gap-4 rounded-xl border border-ink-900/10 bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                    <item.icon size={20} />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-ink-950">{item.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading eyebrow="What You Get" title="Everything included with this guide" align="left" />
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
              {[
                { icon: BookOpen, label: "Full Ebook PDF", detail: product.pageCount ? `${product.pageCount} pages` : undefined },
                ...(hasPlanner
                  ? [
                      {
                        icon: ClipboardList,
                        label: "Matching Planner",
                        detail: integrated ? "Included inside the ebook" : product.plannerPageCount ? `${product.plannerPageCount} pages` : undefined,
                      },
                    ]
                  : []),
                ...(hasSystem
                  ? [
                      {
                        icon: ListChecks,
                        label: "30-Day System",
                        detail: integrated ? "Included inside the ebook" : product.systemPageCount ? `${product.systemPageCount} pages` : undefined,
                      },
                    ]
                  : []),
                { icon: Zap, label: "Instant Digital Access", detail: "Available right after checkout" },
              ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 rounded-xl border border-ink-900/10 bg-white p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                      <item.icon size={20} />
                    </span>
                    <div>
                      <p className="font-display text-base font-bold text-ink-950">{item.label}</p>
                      {item.detail && <p className="text-xs text-ink-500">{item.detail}</p>}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT'S INSIDE — chapters + reference material */}
      {isFoodPreservation && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="What's Inside"
              title="10 Chapters of Illustrated Recipes"
              description="200 recipes organized into 10 chapters, plus a full reference section."
            />
            <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRESERVATION_CHAPTERS.map((c) => (
                <div key={c.number} className="flex items-center gap-4 rounded-xl border border-ink-900/10 bg-white p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 font-display text-sm font-black text-brand-700">
                    {c.number}
                  </span>
                  <p className="font-display text-base font-bold text-ink-950">{c.title}</p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-ink-900/10 bg-white p-6">
              <p className="font-display text-sm font-bold text-ink-950">Plus a full reference section</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {PRESERVATION_REFERENCE_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ink-600">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* FOOD SAFETY NOTE */}
      {isFoodPreservation && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <div className="mx-auto max-w-2xl rounded-xl border border-ink-900/10 bg-cream p-6 sm:p-8">
              <span className="eyebrow">A Note on Safety</span>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                This guide&apos;s canning procedures follow research-tested guidance from the USDA Complete Guide to
                Home Canning and the National Center for Home Food Preservation (NCHFP), together with
                long-established tested practice for jams and jellies. It is written for general educational
                purposes — always follow tested recipes exactly, and consult current guidance from your local
                Cooperative Extension office or the NCHFP for the most up-to-date recommendations.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PLANNER SECTION */}
      {hasPlanner && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">Bonus Planner Included</span>
                <h2 className="mt-4 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
                  Turn what you learn into a routine you can actually follow.
                </h2>
                <ul className="mt-6 space-y-2.5">
                  {["Daily planning pages", "Trackers", "Reflection pages", "Habit tracking", "Weekly reviews"].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                {integrated ? (
                  <p className="mt-6 text-sm text-ink-500">
                    This guide&apos;s planner pages are built directly into the
                    30-page ebook rather than a separate file.
                  </p>
                ) : (
                  product.plannerPdf && (
                    <a
                      href={product.plannerPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary mt-6"
                    >
                      <Eye size={16} /> Preview Planner
                    </a>
                  )
                )}
              </div>
              <div className="mx-auto flex aspect-[3/4] w-full max-w-xs items-center justify-center rounded-lg border border-ink-900/10 bg-cream">
                <ClipboardList size={48} className="text-brand-300" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 30-DAY SYSTEM SECTION */}
      {hasSystem && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading
              eyebrow="Your 30-Day System"
              title="From information to consistent action"
              description="Each guide comes with a practical 30-day system designed to help you turn what you learn into daily habits."
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
              {integrated ? (
                <p className="text-sm text-ink-500">
                  This guide&apos;s 30-day system is built directly into the ebook.
                </p>
              ) : (
                product.systemPdf && (
                  <a
                    href={product.systemPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Eye size={16} /> Preview 30-Day System
                  </a>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* MEAL PLANNER APP PREVIEW */}
      {isHealthyEating && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <SectionHeading
              eyebrow="Inside Your Dashboard"
              title="See What Your Interactive Planner Can Do"
              description="A real tool you'll actually use — not just another PDF to download and forget."
            />
            <div className="mt-10">
              <MealPlannerPreview />
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      {isHealthyEating && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading eyebrow="How It Works" title="Get Started in Three Simple Steps" />
            <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
              {MEAL_PLANNER_HOW_IT_WORKS.map((step, i) => (
                <div key={step.title} className="card p-6 text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <step.icon size={20} />
                  </span>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-brand-600">Step {i + 1}</p>
                  <p className="mt-1 font-display text-base font-bold text-ink-950">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MORE THAN JUST A PDF */}
      {isHealthyEating && (
        <section className="section-pad bg-ink-950">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow bg-white/10 text-gold-300">More Than Just a PDF</span>
              <p className="mt-5 text-balance font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                This isn&apos;t just another ebook to download and forget. Your purchase includes an
                interactive meal-planning experience designed to help you actually use what you learn.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ACCESS EXPLANATION */}
      {isHealthyEating && (
        <section className="section-pad">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-xl font-bold text-ink-950 sm:text-2xl">Getting Access</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
                After your purchase, you&apos;ll receive access to your digital guide and your HealthyGuide
                wellness dashboard, including the Interactive Meal Planner.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="About This Guide" title={`Inside ${product.title}`} align="left" />
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-ink-600">
            {product.description}
          </p>
        </div>
      </section>

      {/* MEAL PLANNER FAQ */}
      {isHealthyEating && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <SectionHeading eyebrow="Questions" title="Meal Planner FAQ" align="left" />
            <div className="mx-auto mt-10 max-w-3xl">
              <FAQAccordion items={MEAL_PLANNER_FAQ} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading eyebrow="More From the Library" title="You might also like" align="left" />
            <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
