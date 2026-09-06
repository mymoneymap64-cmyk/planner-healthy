export interface FaqItem {
  question: string;
  answer: string;
}

// ---------- Products (Ebook Library) ----------

export type ProductCategory =
  | "natural-healing"
  | "mental-wellness"
  | "womens-wellness"
  | "mens-wellness"
  | "herbal-remedies"
  | "sleep-recovery"
  | "healthy-eating";

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  /** Direct-response marketing headline shown on the product page hero. The real `title` above always remains the official product title. */
  marketingHeadline?: string;
  marketingSubheadline?: string;
  category: ProductCategory;
  categoryLabel: string;
  benefits: string[];
  /** null = price not finalized yet — render as "Price coming soon", never invent a number. */
  price: number | null;
  compareAtPrice?: number | null;
  /** null = page count not known — render as "Page count coming soon". Real counts come from the actual PDF. */
  pageCount: number | null;
  badge?: string;
  includedInBundle: boolean;
  isBonus?: boolean;
  /** Real cover image path. null only means no real cover has been provided yet — never fill with a stock/placeholder image. */
  coverImage: string | null;
  /** Real product PDF. null means the file hasn't been provided yet. */
  ebookPdf: string | null;
  /** Real planner PDF, when this product has one as a separate file. */
  plannerPdf: string | null;
  plannerPageCount: number | null;
  /** Real 30-day system PDF, when this product has one as a separate file. */
  systemPdf: string | null;
  systemPageCount: number | null;
  /** True when the planner/system content is bundled inside the main ebook PDF rather than shipped as separate files. */
  plannerAndSystemIncludedInEbook?: boolean;
  featured?: boolean;
}

// ---------- Images ----------

export type ImageKey =
  | "healthyMeals"
  | "healthyMealsAlt"
  | "mealPrep"
  | "mealPrepAlt"
  | "walking"
  | "walkingAlt"
  | "workouts"
  | "workoutsAlt"
  | "hydration"
  | "sleep"
  | "sleepAlt"
  | "healthyLifestyle"
  | "healthyLifestyleAlt"
  | "morningRoutine"
  | "morningRoutineAlt"
  | "breakfast"
  | "healthyHabits"
  | "motivation"
  | "motivationAlt";

export interface ImageAsset {
  key: ImageKey;
  url: string;
  alt: string;
  filename: string;
  width: number;
  height: number;
  credit: string;
}

// ---------- Blog ----------

export type BlogCategorySlug =
  | "healthy-habits"
  | "nutrition"
  | "meal-planning"
  | "fitness"
  | "walking-movement"
  | "sleep"
  | "mindset"
  | "lifestyle";

export interface BlogCategory {
  slug: BlogCategorySlug;
  name: string;
  description: string;
  icon: string;
}

export interface BlogSection {
  heading: string;
  level: 2 | 3;
  paragraphs: string[];
  list?: string[];
}

export interface BlogPost {
  number: number;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  category: BlogCategorySlug;
  tags: string[];
  excerpt: string;
  imageKey: ImageKey;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  featured?: boolean;
  popular?: boolean;
  intro: string[];
  sections: BlogSection[];
  faqs?: FaqItem[];
  conclusion: string[];
  ctaText?: string;
  relatedSlugs: string[];
}

export interface BlogManifestEntry {
  number: number;
  title: string;
  slug: string;
  category: BlogCategorySlug;
  imageKey: ImageKey;
}
