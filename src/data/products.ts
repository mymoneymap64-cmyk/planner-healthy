import { Product } from "@/lib/types";

/**
 * Core product catalog — 7 real wellness ebooks. All copy (subtitle,
 * tagline, benefit bullets) is transcribed directly from the real cover
 * art and interior "Welcome" pages the client provided, not invented.
 * `marketingHeadline` / `marketingSubheadline` are original direct-response
 * copy written for each guide — the real `title` above always stays the
 * official product name. `price` ($9.99 launch) / `compareAtPrice` ($27
 * regular value) are the individual-product pricing the client provided.
 * `pageCount` / `plannerPageCount` / `systemPageCount` are read directly
 * from the actual PDFs in public/products/. Never fill a null with an
 * invented number.
 */
export const PRODUCTS: Product[] = [
  {
    id: "01",
    slug: "natural-healing-handbook",
    title: "The Natural Healing Handbook",
    subtitle: "Practical Herbal Recipes, Natural Wellness & Everyday Health",
    tagline: "Natural Wellness Library",
    marketingHeadline: "A Practical Handbook for Natural Healing, Right From Your Kitchen",
    marketingSubheadline:
      "The complete ebook, planner, and 30-day system designed to turn herbal recipes and everyday wellness habits into a routine you can actually keep.",
    description:
      "A 30-page illustrated guide to natural, herbal-based wellness — practical herbal recipes and everyday health guidance, with a planner and 30-day habit system built directly into the guide.",
    category: "natural-healing",
    categoryLabel: "Natural Wellness",
    benefits: [
      "Practical herbal recipes for everyday use",
      "Natural wellness guidance in plain language",
      "Planner and 30-day habit system built into the guide",
    ],
    price: 9.99,
    compareAtPrice: 27,
    pageCount: 30,
    badge: "Core Guide",
    includedInBundle: true,
    coverImage: "/products/01-natural-healing/cover.png",
    ebookPdf: "/products/01-natural-healing/ebook.pdf",
    plannerPdf: null,
    plannerPageCount: null,
    systemPdf: null,
    systemPageCount: null,
    plannerAndSystemIncludedInEbook: true,
    featured: true,
  },
  {
    id: "02",
    slug: "mental-wellness-guide",
    title: "Mental Wellness Guide",
    subtitle: "Practical Tools for a Calmer Mind, Better Habits & Emotional Balance",
    tagline: "Calm Mind. Strong You. Better Life.",
    marketingHeadline: "Practical Tools for a Calmer Mind, Not Just Another Self-Help Read",
    marketingSubheadline:
      "The complete ebook, planner, and 30-day system designed to turn mindset tools into habits that actually ease your everyday stress.",
    description:
      "A practical mental wellness guide covering mindset tools, stress relief, and calm daily habits — paired with a matching planner and 30-day system.",
    category: "mental-wellness",
    categoryLabel: "Mental Wellness",
    benefits: [
      "Mindset tools for stress and overwhelm",
      "Simple habits for emotional balance",
      "Calm-habit routines you can repeat daily",
    ],
    price: 9.99,
    compareAtPrice: 27,
    pageCount: 30,
    badge: "Core Guide",
    includedInBundle: true,
    coverImage: "/products/02-mental-wellness/cover.png",
    ebookPdf: "/products/02-mental-wellness/ebook.pdf",
    plannerPdf: "/products/02-mental-wellness/planner.pdf",
    plannerPageCount: 20,
    systemPdf: "/products/02-mental-wellness/system.pdf",
    systemPageCount: 9,
  },
  {
    id: "03",
    slug: "womens-wellness-guide",
    title: "Women's Wellness Guide",
    subtitle: "Hormone Balance, Self-Care, Nutrition & Everyday Vitality",
    tagline: "Nourish Your Body, Empower Your Life.",
    marketingHeadline: "A Wellness Guide Built Specifically Around a Woman's Everyday Life",
    marketingSubheadline:
      "The complete ebook, planner, and 30-day system designed to turn hormone balance, self-care, and nutrition guidance into a routine you'll actually follow.",
    description:
      "A focused women's wellness guide covering hormone balance, self-care, and nutrition — paired with a matching planner and 30-day system.",
    category: "womens-wellness",
    categoryLabel: "Women's Wellness",
    benefits: [
      "Guidance on hormone balance and everyday vitality",
      "Practical self-care routines",
      "Nutrition guidance written for women's wellness",
    ],
    price: 9.99,
    compareAtPrice: 27,
    pageCount: 30,
    badge: "Core Guide",
    includedInBundle: true,
    coverImage: "/products/03-womens-wellness/cover.png",
    ebookPdf: "/products/03-womens-wellness/ebook.pdf",
    plannerPdf: "/products/03-womens-wellness/planner.pdf",
    plannerPageCount: 20,
    systemPdf: "/products/03-womens-wellness/system.pdf",
    systemPageCount: 7,
  },
  {
    id: "04",
    slug: "mens-wellness-guide",
    title: "Men's Wellness Guide",
    subtitle: "Strength, Energy, Performance & Long-Term Health",
    tagline: "Stronger Body. Sharper Mind. Better Life.",
    marketingHeadline: "Built for Men Who Want Real Strength and Energy, Not Fad Advice",
    marketingSubheadline:
      "The complete ebook, planner, and 30-day system designed to turn strength, energy, and recovery habits into a routine that actually fits your life.",
    description:
      "A men's wellness guide focused on strength, energy, and long-term health — paired with a matching planner and 30-day system.",
    category: "mens-wellness",
    categoryLabel: "Men's Wellness",
    benefits: [
      "Guidance on strength and everyday energy",
      "Practical routines for long-term health",
      "Performance-focused daily habits",
    ],
    price: 9.99,
    compareAtPrice: 27,
    pageCount: 30,
    badge: "Core Guide",
    includedInBundle: true,
    coverImage: "/products/04-mens-wellness/cover.png",
    ebookPdf: "/products/04-mens-wellness/ebook.pdf",
    plannerPdf: "/products/04-mens-wellness/planner.pdf",
    plannerPageCount: 20,
    systemPdf: "/products/04-mens-wellness/system.pdf",
    systemPageCount: 7,
  },
  {
    id: "05",
    slug: "natural-remedies-herbal-recipes",
    title: "Natural Remedies & Herbal Recipes",
    subtitle: "Healing Ingredients, Herbal Recipes & Daily Remedies",
    tagline: "Simple Ingredients. Powerful Healing.",
    marketingHeadline: "Simple Herbal Remedies You Can Actually Make at Home",
    marketingSubheadline:
      "The complete ebook, planner, and 30-day system designed to turn herbal recipes and natural remedies into habits you'll actually use.",
    description:
      "A hands-on collection of herbal remedies and recipes built around simple, natural ingredients — paired with a matching planner and 30-day system.",
    category: "herbal-remedies",
    categoryLabel: "Natural Remedies",
    benefits: [
      "Herbal recipes using simple, accessible ingredients",
      "Healing recipes organized for quick reference",
      "Daily remedy ideas for common concerns",
    ],
    price: 9.99,
    compareAtPrice: 27,
    pageCount: 30,
    badge: "Core Guide",
    includedInBundle: true,
    coverImage: "/products/05-natural-remedies/cover.png",
    ebookPdf: "/products/05-natural-remedies/ebook.pdf",
    plannerPdf: "/products/05-natural-remedies/planner.pdf",
    plannerPageCount: 20,
    systemPdf: "/products/05-natural-remedies/system.pdf",
    systemPageCount: 7,
  },
  {
    id: "06",
    slug: "sleep-recovery-handbook",
    title: "Sleep & Recovery Handbook",
    subtitle: "Build Calmer Evenings, Better Routines & Restorative Habits",
    tagline: "Practical. Simple. Realistic.",
    marketingHeadline: "The Wind-Down System for People Who Can't Seem to Switch Off",
    marketingSubheadline:
      "The complete ebook, planner, and 30-day system designed to turn better sleep and recovery habits into a routine you can actually stick to.",
    description:
      "A practical sleep and recovery handbook with wind-down routines, environment checklists, and trackers — paired with a matching planner and 30-day reset.",
    category: "sleep-recovery",
    categoryLabel: "Sleep & Recovery",
    benefits: [
      "Evening wind-down routines for better sleep",
      "Environment checklists for a more restful space",
      "Recovery trackers to build consistency",
    ],
    price: 9.99,
    compareAtPrice: 27,
    pageCount: 30,
    badge: "Core Guide",
    includedInBundle: true,
    coverImage: "/products/06-sleep-recovery/cover.png",
    ebookPdf: "/products/06-sleep-recovery/ebook.pdf",
    plannerPdf: "/products/06-sleep-recovery/planner.pdf",
    plannerPageCount: 20,
    systemPdf: "/products/06-sleep-recovery/system.pdf",
    systemPageCount: 7,
  },
  {
    id: "07",
    slug: "healthy-eating-guide",
    title: "Healthy Eating Guide",
    subtitle: "Nourish Your Body. Fuel Your Life. Simple. Delicious. Sustainable.",
    tagline: "Real Food. Balanced Meals. Better Health. Every Day.",
    marketingHeadline: "Eat Better Without Overhauling Your Entire Life",
    marketingSubheadline:
      "The complete ebook, planner, and 30-day system designed to turn balanced eating habits into a routine that actually fits a busy schedule.",
    description:
      "A practical healthy eating guide focused on real food and balanced meals — paired with a matching planner and 30-day meal plan.",
    category: "healthy-eating",
    categoryLabel: "Healthy Eating",
    benefits: [
      "Nutritious, real-food recipes",
      "Balanced meal guidance without extreme rules",
      "Sustainable, everyday eating habits",
    ],
    price: 9.99,
    compareAtPrice: 27,
    pageCount: 30,
    badge: "Core Guide",
    includedInBundle: true,
    coverImage: "/products/07-healthy-eating/cover.png",
    ebookPdf: "/products/07-healthy-eating/ebook.pdf",
    plannerPdf: "/products/07-healthy-eating/planner.pdf",
    plannerPageCount: 20,
    systemPdf: "/products/07-healthy-eating/system.pdf",
    systemPageCount: 7,
  },
];

/**
 * Free bonus guides. Titles, subtitles, and page counts are transcribed
 * directly from each bonus PDF's own real cover page.
 */
export const BONUS_PRODUCTS: Product[] = [
  {
    id: "bonus-01",
    slug: "natural-wellness-quick-guide",
    title: "Natural Wellness Quick Guide",
    subtitle: "Simple routines, herbal kitchen ideas, and everyday wellness checklists.",
    tagline: "Practical • Simple • Easy to Use",
    description:
      "A free quick-reference guide with simple wellness routines, herbal kitchen ideas, and everyday checklists.",
    category: "natural-healing",
    categoryLabel: "Free Bonus",
    benefits: [],
    price: 0,
    compareAtPrice: null,
    pageCount: 22,
    badge: "Free Bonus",
    includedInBundle: true,
    isBonus: true,
    coverImage: "/bonuses/bonus-01/cover.png",
    ebookPdf: "/bonuses/bonus-01/ebook.pdf",
    plannerPdf: null,
    plannerPageCount: null,
    systemPdf: null,
    systemPageCount: null,
  },
  {
    id: "bonus-02",
    slug: "30-day-healthy-habits-challenge",
    title: "30-Day Healthy Habits Challenge",
    subtitle: "A simple daily checklist for building realistic routines that last.",
    tagline: "Practical • Simple • Easy to Use",
    description:
      "A free daily checklist for building realistic, lasting healthy habits over 30 days.",
    category: "healthy-eating",
    categoryLabel: "Free Bonus",
    benefits: [],
    price: 0,
    compareAtPrice: null,
    pageCount: 35,
    badge: "Free Bonus",
    includedInBundle: true,
    isBonus: true,
    coverImage: "/bonuses/bonus-02/cover.png",
    ebookPdf: "/bonuses/bonus-02/ebook.pdf",
    plannerPdf: null,
    plannerPageCount: null,
    systemPdf: null,
    systemPageCount: null,
  },
];

export const ALL_PRODUCTS: Product[] = [...PRODUCTS, ...BONUS_PRODUCTS];

export function getProduct(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}
