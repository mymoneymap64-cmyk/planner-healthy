"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

const AUTO_ADVANCE_MS = 5000;
const FADE_MS = 200;

/**
 * A single-slide-at-a-time, auto-advancing carousel for the full Cake &
 * Baking Collection. Only the active slide is ever rendered (crossfaded via
 * a brief opacity transition on index change) rather than stacking all 10
 * slides absolutely inside a guessed fixed height — product subtitles vary
 * in length, so a fixed-height approach either clips longer content or
 * wastes space on shorter content. Letting the container size to its own
 * (single) slide's natural content height avoids both.
 *
 * Every cover in this collection is exactly 2:3, and `object-contain`
 * guarantees no cropping/stretching even if that ever changes.
 *
 * Auto-advance pauses on hover, on focus of any control inside, and is
 * skipped entirely when the user prefers reduced motion — manual prev/next
 * and the dots still work normally in that case, just without the timer.
 */
export default function FeaturedCakeCarousel({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = products.length;
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      const resolved = ((nextIndex % total) + total) % total;
      if (resolved === index) return;
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      if (reducedMotion) {
        setIndex(resolved);
        return;
      }
      setVisible(false);
      fadeTimeout.current = setTimeout(() => {
        setIndex(resolved);
        setVisible(true);
      }, FADE_MS);
    },
    [index, total, reducedMotion]
  );

  useEffect(() => () => {
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || total <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const nextIndex = (i + 1) % total;
        setVisible(false);
        fadeTimeout.current = setTimeout(() => setVisible(true), FADE_MS);
        return nextIndex;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, reducedMotion, total]);

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  const containerRef = useRef<HTMLDivElement>(null);
  const product = products[index];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Cake & Baking Ebooks"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <div
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${total}: ${product.title}`}
          className={`grid grid-cols-1 items-center gap-6 p-6 transition-opacity sm:gap-10 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-12 ${
            reducedMotion ? "duration-0" : "duration-200"
          } ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="mx-auto w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[220px]">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lift">
              <Image
                src={product.coverImage!}
                alt={`${product.title} ebook cover`}
                fill
                sizes="(min-width: 1024px) 220px, 40vw"
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </div>
          <div className="text-center lg:text-left">
            <span className="eyebrow">{product.categoryLabel}</span>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-balance text-ink-950 sm:text-3xl">
              {product.title}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-balance text-sm leading-relaxed text-ink-600 lg:mx-0 sm:text-base">
              {product.subtitle}
            </p>
            <p className="mt-4 font-display text-xl font-black text-ink-950">
              ${product.price!.toFixed(2)}
            </p>
            <Link
              href={`/library/${product.slug}`}
              className="btn-gold mt-5 w-full justify-center sm:w-auto"
            >
              Get the Ebook <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous ebook"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/15 bg-white text-ink-700 transition-colors hover:bg-brand-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}: ${p.title}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand-700" : "w-2.5 bg-ink-900/15 hover:bg-ink-900/30"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next ebook"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/15 bg-white text-ink-700 transition-colors hover:bg-brand-50"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
