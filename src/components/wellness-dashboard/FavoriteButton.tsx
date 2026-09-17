"use client";

import { Heart } from "lucide-react";

export default function FavoriteButton({
  active,
  onToggle,
  className,
}: {
  active: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      className={
        className ??
        "flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-400 shadow-soft transition-colors hover:text-red-500"
      }
    >
      <Heart size={16} className={active ? "fill-red-500 text-red-500" : ""} />
    </button>
  );
}
