import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/seo";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Natural Wellness Library — Your Complete Wellness Library, In One Place",
  description:
    "A curated collection of 7 practical wellness guides — natural healing, mental wellness, women's and men's wellness, herbal remedies, sleep & recovery, and healthy eating — each with a matching planner and 30-day system. Instant digital access.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Natural Wellness Library — Your Complete Wellness Library, In One Place",
    description:
      "Practical, easy-to-follow wellness ebooks with matching planners and 30-day systems, all in one digital library.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* HBAgency CLS-optimization stylesheet — kept as a normal
            render-blocking <link> intentionally: it exists specifically to
            reserve ad-slot space before HBAgency's own script inserts
            anything, so deferring it would defeat the CLS-prevention
            purpose it's documented for. */}
        <link rel="stylesheet" href="https://hbagency.it/cdn/stylehb.css" />
      </head>
      <body className="font-sans">
        {children}
        {/* HBAgency header-bidding script — rendered once here in the root
            layout so it loads exactly once across the whole site, on every
            route, and is never duplicated on client-side navigation.
            strategy="afterInteractive" mirrors the vendor's own `async`
            attribute (loads without blocking render) using Next's
            recommended approach for third-party ad/analytics tags. */}
        <Script
          src="https://d3u598arehtfkf.cloudfront.net/prebid_hb_39870_43777.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
