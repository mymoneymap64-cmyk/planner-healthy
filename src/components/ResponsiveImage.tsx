import Image from "next/image";
import { ImageKey } from "@/lib/types";
import { getImage } from "@/data/images";

export default function ResponsiveImage({
  imageKey,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  rounded = "rounded-2xl",
}: {
  imageKey: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: string;
}) {
  const asset = getImage(imageKey);

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <Image
        src={asset.url}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        loading={priority ? undefined : "lazy"}
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
