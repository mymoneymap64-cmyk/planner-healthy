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
      className={`${hasOwnPosition ? "" : "relative "}overflow-hidden rounded-lg shadow-lift bg-ink-100 ${className}`}
    >
      <Image
        src={product.coverImage}
        alt={`${product.title} ebook cover`}
        fill
        priority={priority}
        className="object-cover"
        sizes="(min-width: 1024px) 320px, 45vw"
      />
    </div>
  );
}
