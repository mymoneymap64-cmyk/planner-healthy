import Link from "next/link";
import { Product } from "@/lib/types";
import ProductCover from "./ProductCover";

/**
 * A deliberate 3-cover overlapping fan, in the same spirit as
 * LibraryHeroStack but tuned specifically for exactly three covers at a
 * larger, more legible scale — the front-center cover reads clearly at a
 * glance, with the two side covers rotated slightly behind it. Percentages
 * are tuned (with margin for each cover's rotation overhang) so every
 * cover's full box stays inside the container at any width — this scales
 * identically on mobile and desktop, so the same component works for both
 * without ever needing horizontal scroll or a cramped, shrunken layout.
 */
const LAYOUT = [
  "absolute left-[1%] top-[16%] w-[46%] -rotate-[9deg] z-10",
  "absolute left-[53%] top-[16%] w-[46%] rotate-[9deg] z-20",
  "absolute left-[25%] top-[0%] w-[50%] rotate-0 z-30",
];

export default function CakeCollectionStack({ products }: { products: Product[] }) {
  const covers = products.slice(0, 3);

  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-sm lg:max-w-md">
      {/* Padding-based spacer (see LibraryHeroStack for why): sizes purely
          from this div's own width so every cover's tuned position stays
          inside it regardless of the surrounding grid. */}
      <div className="pt-[108%]" />
      <div className="absolute inset-0">
        {covers.map((product, i) => (
          <Link
            key={product.slug}
            href={`/library/${product.slug}`}
            aria-label={product.title}
            className={`${LAYOUT[i % LAYOUT.length]} block transition-transform hover:-translate-y-1`}
          >
            <ProductCover
              product={product}
              priority={i === 2}
              className="aspect-[3/4] w-full shadow-lift ring-1 ring-ink-900/10"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
