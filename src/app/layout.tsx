import type { Metadata } from "next";
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
  verification: {
    other: {
      "p:domain_verify": "7fd0ff7b7b39db5084bd661f3b9fc38d",
    },
  },
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
      <body className="font-sans">{children}</body>
    </html>
  );
}
