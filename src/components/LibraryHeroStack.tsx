import { Product } from "@/lib/types";
import ProductCover from "./ProductCover";

// Percentages are tuned (with a safety margin, accounting for the rotation
// transform's diagonal overhang) so every cover's full box stays inside the
// container — nothing here should ever require clipping to look right.
const LAYOUT = [
  "absolute left-[0%] top-[28%] w-[24%] rotate-[-8deg] z-10",
  "absolute left-[13%] top-[5%] w-[25%] rotate-[-4deg] z-20",
  "absolute left-[27%] top-[20%] w-[26%] rotate-[3deg] z-30",
  "absolute left-[42%] top-[2%] w-[25%] rotate-[-2deg] z-40",
  "absolute left-[56%] top-[22%] w-[25%] rotate-[6deg] z-30",
  "absolute left-[70%] top-[7%] w-[24%] rotate-[-5deg] z-20",
  "absolute left-[62%] top-[42%] w-[23%] rotate-[8deg] z-10",
];

export default function LibraryHeroStack({ products }: { products: Product[] }) {
  const covers = products.slice(0, 7);

  return (
    <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl">
      {/*
        The stack's height used to come from `aspect-[5/4]` on this div, but
        inside this two-column, align-items-center grid, the browser was
        resolving that aspect-ratio against the grid row's height instead of
        this div's own width — inflating it far beyond what any cover's
        top/left percentages were tuned for, so the last (lowest) cover got
        pushed past the section's bottom edge and clipped. A padding-based
        spacer sizes purely from this div's own width, sidestepping that
        ambiguity entirely, so every cover's box reliably stays inside it.
      */}
      <div className="pt-[80%]" />
      <div className="absolute inset-0">
        {covers.map((product, i) => (
          <ProductCover
            key={product.slug}
            product={product}
            priority={i < 3}
            className={`${LAYOUT[i % LAYOUT.length]} aspect-[3/4] border border-white/10`}
          />
        ))}
      </div>
    </div>
  );
}
