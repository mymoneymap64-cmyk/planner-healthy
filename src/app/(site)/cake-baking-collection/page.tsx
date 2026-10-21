import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Cake,
  ChefHat,
  Cookie,
  CupSoda,
  IceCreamBowl,
  Lock,
  PartyPopper,
  Snowflake,
  Sparkles,
  Wheat,
  Zap,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCover from "@/components/ProductCover";
import FAQAccordion from "@/components/FAQAccordion";
import BakingVideoCard from "@/components/BakingVideoCard";
import BlogPostCard from "@/components/BlogPostCard";
import JsonLd from "@/components/JsonLd";
import ResponsiveImage from "@/components/ResponsiveImage";
import { STANDALONE_PRODUCTS } from "@/data/products";
import { BAKING_VIDEOS } from "@/data/bakingVideos";
import { BLOG_POSTS } from "@/data/blog/posts";
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, productDetailJsonLd, SITE_URL } from "@/lib/seo";
import { ImageKey, Product } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Cake & Baking Collection — 10 Digital Baking Ebooks | Natural Wellness Library",
  description:
    "Browse all 10 Cake & Baking Collection ebooks — beginner cake basics, decorating and frosting, cheesecakes, cookies, pies, no-bake desserts, and breakfast bakes. Each a $2.99 digital PDF.",
  path: "/cake-baking-collection",
});

function getProduct(slug: string): Product {
  return STANDALONE_PRODUCTS.find((p) => p.slug === slug)!;
}

// The recipe-to-shared-moment journey: each photo is paired with one real,
// existing product it genuinely relates to in tone or occasion — never a
// random pairing. Captions describe the moment shown, not a claim about who
// bought what; the "illustrative photography" note below the grid makes
// that distinction explicit to visitors.
const JOURNEY_MOMENTS: { imageKey: ImageKey; slug: string; caption: string }[] = [
  {
    imageKey: "followingARecipe",
    slug: "cake-baking-for-beginners",
    caption: "Start with a clear recipe and real ingredients — no guesswork, just a plan you can follow.",
  },
  {
    imageKey: "familyBakingCakeTogether",
    slug: "cheesecake-cupcake-mini-cake-cookbook",
    caption: "Mixing the batter together turns a recipe into a shared activity, cookie cutters and all.",
  },
  {
    imageKey: "presentingBirthdayCake",
    slug: "celebration-cakes-for-every-occasion",
    caption: "A finished cake is something to bring to the table and show off, candles and all.",
  },
  {
    imageKey: "familyEnjoyingCake",
    slug: "ultimate-cake-recipe-collection",
    caption: "And then comes the best part — sharing it with the people you made it for.",
  },
];

// Every category maps to one or more real, existing products — no invented
// entries. The two 2,400-combination books get their own category so the
// "combinations, not independently unique recipes" distinction stays clear
// and isn't blended in with the hand-written single-recipe books.
const CATEGORIES: { title: string; desc: string; icon: typeof Cake; slugs: string[] }[] = [
  {
    title: "Beginner Baking Basics",
    desc: "Start here if you're new to baking — tools, measuring, mixing, and troubleshooting, explained plainly.",
    icon: ChefHat,
    slugs: ["cake-baking-for-beginners"],
  },
  {
    title: "Cake Decorating & Frosting",
    desc: "Buttercream, ganache, fillings, and piping technique for finishing a cake like a bakery.",
    icon: Sparkles,
    slugs: ["cake-decorating-and-frosting-handbook"],
  },
  {
    title: "Cheesecakes & Cupcakes",
    desc: "Baked and no-bake cheesecakes, cupcakes, and mini cakes — clearly distinguished, never conflated.",
    icon: CupSoda,
    slugs: ["cheesecake-cupcake-mini-cake-cookbook"],
  },
  {
    title: "Celebration Cakes",
    desc: "Birthday, holiday, and formal-occasion cakes, with planning, sizing, and transport guidance.",
    icon: PartyPopper,
    slugs: ["celebration-cakes-for-every-occasion"],
  },
  {
    title: "Classic Cake Recipe Collections",
    desc: "Two large reference collections of numbered cake recipe combinations, organized by style for everyday inspiration.",
    icon: Cake,
    slugs: ["ultimate-cake-recipe-collection", "modern-cakes-creative-desserts"],
  },
  {
    title: "Cookies & Dessert Bars",
    desc: "Drop cookies, rolled cookies, brownies, blondies, and layered bars.",
    icon: Cookie,
    slugs: ["cookies-brownies-dessert-bars"],
  },
  {
    title: "Pies & Tarts",
    desc: "Classic fruit pies, custard pies, elegant tarts, and crustless crumbles and cobblers.",
    icon: BookOpen,
    slugs: ["pies-tarts-fruit-desserts"],
  },
  {
    title: "No-Bake Desserts",
    desc: "Cheesecakes, icebox cakes, and chilled desserts set entirely by the refrigerator — no oven required.",
    icon: Snowflake,
    slugs: ["no-bake-desserts-chilled-cakes"],
  },
  {
    title: "Breakfast Bakes",
    desc: "Cinnamon rolls, brioche, quick breads, and coffee cakes for a weekend breakfast table.",
    icon: Wheat,
    slugs: ["sweet-breads-rolls-breakfast-bakes"],
  },
];

const ALL_SLUGS = CATEGORIES.flatMap((c) => c.slugs);

const FEATURED_VIDEO_IDS = ["best-vanilla-cake", "best-buttercream", "how-to-decorate-a-cake", "easy-cheesecake"];
const FEATURED_VIDEOS = FEATURED_VIDEO_IDS.map((id) => BAKING_VIDEOS.find((v) => v.id === id)!);

const BAKING_BLOG_POSTS = BLOG_POSTS.filter((p) => p.category === "baking-recipes").slice(0, 6);

const FAQS = [
  {
    question: "What do I actually receive when I buy an ebook?",
    answer:
      "Each purchase unlocks one digital PDF ebook, delivered instantly through a secure, private download link tied to your order — there's no physical product and nothing shipped.",
  },
  {
    question: "Is this a subscription or a one-time payment?",
    answer:
      "One-time payment of $2.99 per ebook. You keep the PDF permanently — there's no subscription, recurring charge, or account required.",
  },
  {
    question: "Can I preview an ebook before buying?",
    answer:
      "Each product page lists the real recipe or preparation count, page count, and a full description so you know exactly what's inside before you buy. We don't currently offer sample-chapter downloads, but nothing in the listed contents is exaggerated.",
  },
  {
    question: "How is checkout handled, and is it secure?",
    answer:
      "Checkout is processed through PayPal. After payment, your PDF is delivered through a private, token-protected download link — the file itself is never publicly accessible, and only a completed order can unlock it.",
  },
  {
    question: "What devices can I read the ebooks on?",
    answer:
      "Any device that opens a standard PDF — phone, tablet, computer, or e-reader. There's no app to install and no account to create.",
  },
  {
    question: "Are the recipes in every book kitchen-tested?",
    answer:
      "No book in this collection claims every recipe has been kitchen-tested. Each one states plainly, in its own introduction, that recipes are based on standard baking ratios and technique rather than documented testing of every single entry — we'd rather be accurate than overstate it.",
  },
];

export default function CakeBakingCollectionPage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Cake & Baking Collection", path: "/cake-baking-collection" }])}
      />
      <JsonLd data={faqJsonLd(FAQS)} />
      {ALL_SLUGS.map((slug) => {
        const p = getProduct(slug);
        return (
          <JsonLd
            key={slug}
            data={productDetailJsonLd({
              title: p.title,
              description: p.description,
              path: `/library/${p.slug}`,
              imageUrl: p.coverImage ? `${SITE_URL}${p.coverImage}` : undefined,
              price: p.price,
            })}
          />
        );
      })}

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-cream">
        <div className="container-page relative py-14 sm:py-18 lg:py-20">
          <Breadcrumbs items={[{ name: "Cake & Baking Collection", href: "/cake-baking-collection" }]} />
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <span className="eyebrow">Baking &amp; Recipes · 10 Digital PDF Ebooks</span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-balance text-ink-950 sm:text-5xl">
              Everything You Need to Bake With Confidence
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-600 sm:text-lg">
              Ten standalone cake and baking ebooks — beginner technique,
              decorating, cheesecakes, cookies, pies, no-bake desserts, and
              breakfast bakes. Each is a one-time $2.99 digital PDF, yours
              to keep.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#collection" className="btn-gold">
                Browse the Collection <ArrowRight size={16} />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-ink-500">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-gold-700" /> Instant Digital Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <Lock size={14} className="text-gold-700" /> Secure Checkout
              </span>
              <span className="flex items-center gap-1.5">
                <IceCreamBowl size={14} className="text-gold-700" /> $2.99 Each, No Bundle Required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MORE THAN RECIPES — MOMENTS WORTH SHARING — the recipe-to-shared-moment journey */}
      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">From Recipe to Shared Moment</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              More Than Recipes — Moments Worth Sharing
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              Discover new baking ideas, build confidence in the kitchen,
              and create cakes and desserts to share with the people you
              love.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {JOURNEY_MOMENTS.map((moment) => {
              const product = getProduct(moment.slug);
              return (
                <div
                  key={moment.imageKey}
                  className="overflow-hidden rounded-[1.4rem] border border-ink-900/10 bg-white shadow-soft"
                >
                  <ResponsiveImage
                    imageKey={moment.imageKey}
                    className="aspect-[4/3] w-full"
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    rounded="rounded-none"
                    priority={moment.slug === JOURNEY_MOMENTS[0].slug}
                  />
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-ink-600">{moment.caption}</p>
                    <Link
                      href={`/library/${product.slug}`}
                      className="mt-4 flex items-center gap-3 rounded-xl border border-ink-900/10 bg-cream p-3 transition-colors hover:border-brand-200"
                    >
                      <ProductCover product={product} className="aspect-[2/3] w-12 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-ink-950">{product.title}</span>
                        <span className="text-xs font-semibold text-brand-700">${product.price!.toFixed(2)} — View Ebook</span>
                      </span>
                      <ArrowRight size={16} className="shrink-0 text-ink-400" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <a href="#collection" className="btn-gold">
              Find Your Next Favorite Recipe <ArrowRight size={16} />
            </a>
            <p className="mx-auto mt-5 max-w-xl text-xs text-ink-400">
              Photos are illustrative lifestyle photography licensed for
              this page. They are not photos of verified customers and
              don&rsquo;t depict specific results from these ebooks.
            </p>
          </div>
        </div>
      </section>

      {/* COLLECTION, BY CATEGORY */}
      <section id="collection" className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">The Full Collection</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              Browse by What You Want to Bake
            </h2>
          </div>

          <div className="mt-14 space-y-16">
            {CATEGORIES.map((category) => (
              <div key={category.title}>
                <div className="flex items-center gap-3 border-b border-ink-900/8 pb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <category.icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-950">{category.title}</h3>
                    <p className="text-sm text-ink-500">{category.desc}</p>
                  </div>
                </div>
                <div
                  className={`mt-6 grid gap-6 ${
                    category.slugs.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-1 lg:max-w-xl"
                  }`}
                >
                  {category.slugs.map((slug) => {
                    const product = getProduct(slug);
                    return (
                      <div key={slug} className="card flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
                        <Link href={`/library/${slug}`} className="mx-auto w-full max-w-[160px] shrink-0 sm:mx-0">
                          <ProductCover product={product} className="aspect-[2/3] w-full" />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <Link href={`/library/${slug}`} className="hover:text-brand-700">
                            <h4 className="font-display text-lg font-bold text-ink-950">{product.title}</h4>
                          </Link>
                          <p className="mt-1 text-sm font-semibold text-brand-700">{product.subtitle}</p>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                            {product.description}
                          </p>
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span className="font-display text-xl font-black text-ink-950">
                              ${product.price!.toFixed(2)}
                            </span>
                            {product.pageCount && (
                              <span className="text-xs text-ink-400">{product.pageCount} pages</span>
                            )}
                          </div>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <Link href={`/checkout/${slug}`} className="btn-gold !px-4 !py-2.5 text-sm">
                              Get the Ebook <ArrowRight size={14} />
                            </Link>
                            <Link
                              href={`/library/${slug}`}
                              className="flex items-center text-sm font-bold text-brand-700 hover:underline"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH & LEARN */}
      <section className="section-pad bg-cream">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">Watch &amp; Learn</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Real Videos to Go With These Ebooks
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                A few verified tutorials to watch alongside the techniques
                covered in the collection above.
              </p>
            </div>
            <Link
              href="/baking-videos"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline sm:inline-flex"
            >
              View All Videos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_VIDEOS.map((video) => (
              <BakingVideoCard key={video.id} video={video} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/baking-videos" className="text-sm font-bold text-brand-700 hover:underline inline-flex items-center gap-1.5">
              View All Videos <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* LEARN AS YOU BAKE — BLOG */}
      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">From the Blog</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
                Learn as You Bake
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Free articles on cake fundamentals, measuring, frosting, and
                more — useful whether or not you buy anything.
              </p>
            </div>
            <Link
              href="/blog/category/baking-recipes"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline sm:inline-flex"
            >
              Read All Baking Articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BAKING_BLOG_POSTS.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog/category/baking-recipes" className="text-sm font-bold text-brand-700 hover:underline inline-flex items-center gap-1.5">
              Read All Baking Articles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-cream">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Common Questions</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              Cake &amp; Baking Collection FAQ
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section-pad bg-white text-center">
        <div className="container-page">
          <span className="eyebrow">Ready When You Are</span>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
            Find Your Next Baking Favorite
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-base leading-relaxed text-ink-600">
            Ten ebooks, each $2.99, covering everything from your first
            layer cake to a finished celebration centerpiece.
          </p>
          <div className="mt-7">
            <a href="#collection" className="btn-gold">
              Browse the Collection <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
