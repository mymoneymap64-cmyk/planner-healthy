import { Metadata } from "next";

export const SITE_NAME = "Natural Wellness Library";
export const SITE_TAGLINE = "Your Complete Wellness Library — In One Place";

/**
 * Production domain — single source of truth for canonical URLs, Open
 * Graph URLs, JSON-LD, and the sitemap. Defaults to the live production
 * domain; set NEXT_PUBLIC_SITE_URL in Vercel to override this (e.g. for a
 * staging deployment) without a code change.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.healthyguide.online";

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
  const withHome = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: withHome.map((item, i) => ({
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

export function productJsonLd({
  price,
  path = "/",
}: {
  price: number;
  path?: string;
}) {
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
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${path}`,
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
