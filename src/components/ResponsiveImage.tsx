import Image from "next/image";
import { ImageKey } from "@/lib/types";
import { getImage } from "@/data/images";

export default function ResponsiveImage({
  imageKey,
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  rounded = "rounded-2xl",
}: {
  imageKey: ImageKey;
  className?: string;
  /** Extra classes applied directly to the <img> itself — e.g. an
   * `object-[center_70%]` arbitrary value to reposition the crop within
   * the box set by `className`/`rounded` on the wrapper. */
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
}) {
  const asset = getImage(imageKey);
  // Mirrors ProductCover's same check: lets a caller pass "absolute inset-0"
  // (e.g. a full-bleed background behind overlaid text) without conflicting
  // with the default "relative" this component normally supplies.
  const hasOwnPosition = /\b(absolute|fixed|sticky)\b/.test(className);

  return (
    <div className={`${hasOwnPosition ? "" : "relative "}overflow-hidden ${rounded} ${className}`}>
      <Image
        src={asset.url}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        loading={priority ? undefined : "lazy"}
        priority={priority}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
    </div>
  );
}
