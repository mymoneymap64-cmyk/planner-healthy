"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { PRODUCTS, BONUS_PRODUCTS, STANDALONE_PRODUCTS } from "@/data/products";

const LINKS = [
  { href: "/library", label: "Library" },
  { href: "/ebooks", label: "Ebooks" },
  { href: "/bonuses", label: "Bonuses" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/wellness-system", label: "Wellness System" },
];

const SEARCH_INDEX = [
  ...PRODUCTS.map((p) => ({
    label: p.title,
    href: `/library/${p.slug}`,
    keywords: `${p.categoryLabel} ${p.subtitle}`,
  })),
  ...BONUS_PRODUCTS.map((b) => ({
    label: b.title,
    href: `/library/${b.slug}`,
    keywords: "free bonus guide",
  })),
  ...STANDALONE_PRODUCTS.map((p) => ({
    label: p.title,
    href: `/library/${p.slug}`,
    keywords: `${p.categoryLabel} ${p.subtitle}`,
  })),
  { label: "The Full Library", href: "/library", keywords: "library ebooks guides catalog collection" },
  { label: "Ebook Library", href: "/ebooks", keywords: "ebooks standalone books cookbook baking recipes" },
  { label: "Blog", href: "/blog", keywords: "blog articles habits nutrition sleep mindset" },
  { label: "FAQ", href: "/faq", keywords: "faq questions help support" },
  { label: "The Complete Bundle", href: "/checkout", keywords: "checkout buy price bundle pricing" },
  {
    label: "Wellness System",
    href: "/wellness-system",
    keywords: "wellness system dashboard checklist notes progress tracker",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const results =
    query.trim().length > 0
      ? SEARCH_INDEX.filter((item) =>
          `${item.label} ${item.keywords}`.toLowerCase().includes(query.trim().toLowerCase())
        ).slice(0, 6)
      : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink-900/8 bg-cream/95 backdrop-blur-sm">
      <nav className="container-page flex h-16 items-center justify-between sm:h-[72px]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-900 font-display text-sm font-black text-white transition-transform group-hover:scale-105">
            N
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-950 sm:text-xl">
            Natural Wellness Library
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-[13.5px] font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-ink-950" : "text-ink-500 hover:text-ink-950"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] w-full bg-gold-500 transition-transform duration-200 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            aria-label="Search the site"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink-500 hover:bg-ink-900/5 hover:text-ink-950"
          >
            <Search size={18} />
          </button>
          <Link
            href="/checkout"
            className="flex items-center gap-2 rounded-lg bg-brand-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
          >
            <ShoppingBag size={15} />
            Get the Library
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            aria-label="Search the site"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink-500 hover:bg-ink-900/5 hover:text-ink-950"
          >
            <Search size={19} />
          </button>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink-950 hover:bg-ink-900/5"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-ink-900/8 bg-cream animate-fadeUp">
          <div className="container-page py-4">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, guides, pages..."
                aria-label="Search"
                className="w-full rounded-lg border border-ink-900/15 bg-white py-3 pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 outline-none focus:border-brand-500"
              />
            </div>
            {results.length > 0 && (
              <div className="mt-3 divide-y divide-ink-900/8 rounded-lg border border-ink-900/10 bg-white shadow-card">
                {results.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="block px-4 py-3 text-sm font-medium text-ink-700 hover:bg-brand-50 hover:text-ink-950"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
            {query.trim().length > 0 && results.length === 0 && (
              <p className="mt-3 px-1 text-sm text-ink-400">No matches for &ldquo;{query}&rdquo;.</p>
            )}
          </div>
        </div>
      )}

      {open && (
        <div id="mobile-nav-menu" className="border-t border-ink-900/8 bg-cream lg:hidden animate-fadeUp">
          <div className="container-page flex flex-col gap-1 py-4">
            {LINKS.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-4 py-3 text-base font-semibold ${
                    active ? "bg-brand-50 text-ink-950" : "text-ink-600 hover:bg-brand-50 hover:text-ink-950"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/checkout" className="btn-gold mt-2 w-full">
              <ShoppingBag size={16} />
              Get the Library
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
