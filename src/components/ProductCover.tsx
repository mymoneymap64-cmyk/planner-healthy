import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Product } from "@/lib/types";

export default function ProductCover({
  product,
  className = "",
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  if (!product.coverImage) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink-300 bg-ink-50 text-center ${className}`}
      >
        <ImageOff size={22} className="text-ink-400" />
        <span className="px-3 text-[11px] font-bold uppercase tracking-wide text-ink-400">
          Cover Not Yet Available
        </span>
      </div>
    );
  }

  // This cover's source art has a narrower native aspect ratio than the
  // standard 3:4 card box (and the other 6 covers, which are all a close
  // match to 3:4). object-cover would crop noticeably more off its top and
  // bottom than any sibling cover to fill the same box, making it look
  // zoomed in relative to the rest of the grid. object-contain shows the
  // complete, uncropped artwork at the same box size instead — the small
  // side margins that results in are filled with a color sampled from the
  // cover itself so they read as part of the design, not empty space.
  const needsContainFit = product.slug === "natural-healing-handbook";

  // The wrapper always needs a positioned ancestor for the `fill` Image
  // below to size itself against. Callers that need this cover absolutely
  // positioned (e.g. the fanned homepage hero stack) pass an "absolute ..."
  // class in `className`. Adding our own "relative" on top of that would
  // put two conflicting position utilities on the same element — which one
  // wins then depends on Tailwind's generated CSS order, not the class
  // string order, so it's silently unreliable. Only add "relative" when the
  // caller hasn't already supplied its own position utility.
  const hasOwnPosition = /\b(absolute|fixed|sticky)\b/.test(className);

  return (
    <div
      className={`${hasOwnPosition ? "" : "relative "}overflow-hidden rounded-lg shadow-lift ${needsContainFit ? "bg-brand-900" : "bg-ink-100"} ${className}`}
    >
      <Image
        src={product.coverImage}
        alt={`${product.title} ebook cover`}
        fill
        priority={priority}
        className={needsContainFit ? "object-contain" : "object-cover"}
        sizes="(min-width: 1024px) 320px, 45vw"
      />
    </div>
  );
}
