"use client";

import Link from "next/link";
import { useState } from "react";
import { Play, ArrowRight, ExternalLink } from "lucide-react";
import { BakingVideo } from "@/data/bakingVideos";
import { getProduct } from "@/data/products";

/**
 * Click-to-play YouTube card: renders only a thumbnail + play button until
 * clicked, so visiting the homepage never loads multiple YouTube iframes
 * up front. The privacy-enhanced youtube-nocookie.com embed domain is used,
 * and nothing autoplays until the viewer explicitly presses play.
 */
export default function BakingVideoCard({
  video,
  featured = false,
}: {
  video: BakingVideo;
  featured?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const product = getProduct(video.relatedProductSlug);

  return (
    <div className={`card flex h-full flex-col overflow-hidden ${featured ? "lg:flex-row" : ""}`}>
      <div
        className={`relative aspect-video w-full shrink-0 bg-ink-900 ${featured ? "lg:w-1/2" : ""}`}
      >
        {isPlaying ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={`${video.title} — ${video.channel}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${video.title} by ${video.channel}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* Plain <img>, not next/image — avoids adding i.ytimg.com to the
                remote-image allowlist for a single thumbnail use case. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-ink-950/20 transition-colors group-hover:bg-ink-950/35" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-brand-900 shadow-lift transition-transform group-hover:scale-110">
                <Play size={22} className="ml-0.5" fill="currentColor" />
              </span>
            </span>
            <span className="absolute bottom-2 right-2 rounded bg-ink-950/80 px-1.5 py-0.5 text-[11px] font-bold text-white">
              {video.durationLabel}
            </span>
          </button>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-5 ${featured ? "lg:w-1/2 lg:p-7" : ""}`}>
        <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
          {video.category}
        </span>
        <h3 className={`mt-1.5 font-display font-bold text-ink-950 ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}>
          {video.title}
        </h3>
        <a
          href={video.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold text-ink-500 hover:text-brand-700 hover:underline"
        >
          {video.channel} <ExternalLink size={11} />
        </a>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-600">{video.description}</p>

        {product && (
          <Link
            href={`/library/${product.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
          >
            Goes with: {product.title} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
