import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BakingVideoCard from "./BakingVideoCard";
import { BAKING_VIDEOS } from "@/data/bakingVideos";

export default function BakingVideoSection() {
  const [featured, ...rest] = BAKING_VIDEOS;

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Baking &amp; Recipes</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              Watch &amp; Learn: Cake &amp; Baking Videos
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-600">
              A few real, hand-picked tutorials from Preppy Kitchen to watch
              alongside the recipes in your guides — cake basics,
              buttercream, decorating, and cheesecake technique.
            </p>
          </div>
          <Link
            href="/baking-videos"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline sm:inline-flex"
          >
            View All Videos <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10">
          <BakingVideoCard video={featured} featured />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((video) => (
            <BakingVideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/baking-videos"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:underline"
          >
            View All Videos <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
