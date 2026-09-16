import { Product } from "@/lib/types";

/**
 * What HealthyGuide Reader can actually show for a given product, derived
 * from the real files in `products.ts` — never hand-guessed per product.
 */
export type ReaderCapabilities = {
  ebookAvailable: boolean;
  plannerAvailable: boolean;
  plannerIncludedInEbook: boolean;
  systemPdfAvailable: boolean;
  systemIncludedInEbook: boolean;
  /** True only once real day-by-day content has been authored for this product. */
  structuredSystemAvailable: boolean;
};

export function getReaderCapabilities(product: Product): ReaderCapabilities {
  const included = !!product.plannerAndSystemIncludedInEbook;
  return {
    ebookAvailable: product.ebookPdf !== null,
    plannerAvailable: product.plannerPdf !== null,
    plannerIncludedInEbook: included,
    systemPdfAvailable: product.systemPdf !== null,
    systemIncludedInEbook: included,
    structuredSystemAvailable: Boolean(THIRTY_DAY_SYSTEMS[product.slug]?.days.length === 30),
  };
}

// ---------- Structured 30-Day System content (future) ----------

export type ThirtyDaySystemDay = {
  day: number;
  title: string;
  objective: string;
  instructions: string;
  checklist: string[];
};

export type ThirtyDaySystemContent = {
  slug: string;
  days: ThirtyDaySystemDay[];
};

/**
 * Real, structured day-by-day content, keyed by product slug. Empty today —
 * no product has real day-by-day objectives/instructions/checklists written
 * yet, and none is invented here. The Reader architecture is built to
 * render straight from this registry the moment a product's real content is
 * added (all 30 real `ThirtyDaySystemDay` entries for that slug).
 */
export const THIRTY_DAY_SYSTEMS: Record<string, ThirtyDaySystemContent> = {};
