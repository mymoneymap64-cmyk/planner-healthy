import Link from "next/link";
import { Lock, Sparkles, Zap } from "lucide-react";
import { PRODUCTS } from "@/data/products";

const COLUMNS = [
  {
    title: "The Library",
    links: [
      ...PRODUCTS.map((p) => ({ href: `/library/${p.slug}`, label: p.title })),
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/library", label: "Browse the Library" },
      { href: "/bonuses", label: "Free Bonus Guides" },
      { href: "/checkout", label: "The Complete Library" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

const TRUST_BADGES = [
  { icon: Zap, label: "Instant Digital Delivery" },
  { icon: Lock, label: "Secure Checkout" },
  { icon: Sparkles, label: "Lifetime Access" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-ink-950 text-ink-200">
      <div className="container-page grid grid-cols-3 gap-4 border-b border-white/10 py-6 text-center sm:flex sm:items-center sm:justify-center sm:gap-10">
        {TRUST_BADGES.map((b) => (
          <span key={b.label} className="flex flex-col items-center gap-1.5 text-xs font-semibold text-ink-300 sm:flex-row sm:gap-2">
            <b.icon size={14} className="text-gold-400" />
            {b.label}
          </span>
        ))}
      </div>

      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-5">
          <div className="col-span-2 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white font-display text-sm font-black text-ink-950">
                N
              </span>
              <span className="font-display text-lg font-bold text-white">
                Natural Wellness Library
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              A digital library of 7 practical wellness ebooks — natural
              healing, mental wellness, women&apos;s and men&apos;s wellness,
              herbal remedies, sleep &amp; recovery, and healthy eating —
              each with a matching planner and 30-day system.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-wide text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 transition-colors hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Natural Wellness Library. All rights
            reserved.
          </p>
          <p className="max-w-2xl leading-relaxed">
            These guides are designed for general wellness and educational
            purposes only. They are not medical advice and do not guarantee
            specific results. Consult a healthcare professional before
            making changes to your health, nutrition, or wellness routine.
          </p>
        </div>
      </div>
    </footer>
  );
}
