import { Metadata } from "next";

export const SITE_NAME = "Natural Wellness Library";
export const SITE_TAGLINE = "Your Complete Wellness Library — In One Place";

/**
 * Production domain — single source of truth for canonical URLs, Open
 * Graph URLs, JSON-LD, and the sitemap.
 *
 * IMPORTANT: no real production domain has been configured for this
 * project yet (no .env file, no vercel.json, no package.json field).
 * "https://example.com" below is a placeholder. Before deploying to
 * production, set the NEXT_PUBLIC_SITE_URL environment variable in
 * Vercel (Project Settings → Environment Variables) to your real
 * domain, e.g. https://your-actual-domain.com — no code changes needed.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export function buildMetadata({
  title,
  description,
  path,
  imageUrl,
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 800, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  imageUrl,
  publishedAt,
  updatedAt,
}: {
  title: string;
  description: string;
  path: string;
  imageUrl: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE_NAME} — The Complete Library`,
    description:
      "A collection of 7 practical wellness ebooks — natural healing, mental wellness, women's wellness, men's wellness, natural remedies, sleep & recovery, and healthy eating — each with a matching planner and 30-day system, plus 2 free bonus guides.",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
  };
}

/**
 * Per-product Product + Offer schema for an individual /library/[slug] page.
 * Only reflects real, visible data — no invented reviews or ratings.
 */
export function productDetailJsonLd({
  title,
  description,
  path,
  imageUrl,
  price,
}: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  price: number | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers:
      price !== null
        ? {
            "@type": "Offer",
            priceCurrency: "USD",
            price: price.toFixed(2),
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}${path}`,
          }
        : undefined,
  };
}
