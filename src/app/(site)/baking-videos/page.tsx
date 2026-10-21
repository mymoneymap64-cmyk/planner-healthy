import Breadcrumbs from "@/components/Breadcrumbs";
import BakingVideoCard from "@/components/BakingVideoCard";
import CTASection from "@/components/CTASection";
import { BAKING_VIDEOS } from "@/data/bakingVideos";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cake & Baking Videos | Natural Wellness Library",
  description:
    "Watch verified, real baking tutorials on cake basics, buttercream and piping, decorating, and cheesecake technique — each paired with a matching ebook from the Cake & Baking Collection.",
  path: "/baking-videos",
});

export default function BakingVideosPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-cream section-pad !pb-16">
        <div className="container-page relative">
          <Breadcrumbs items={[{ name: "Baking Videos", href: "/baking-videos" }]} />
          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="eyebrow">Watch &amp; Learn</span>
            <h1 className="mt-5 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              Cake &amp; Baking Videos
            </h1>
            <p className="mt-4 text-balance leading-relaxed text-ink-600">
              A hand-picked set of real, publicly available baking
              tutorials from Preppy Kitchen, each paired with the guide in
              our Cake &amp; Baking Collection that covers the same ground
              in more depth.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BAKING_VIDEOS.map((video) => (
              <BakingVideoCard key={video.id} video={video} />
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-ink-900/8 bg-cream/60 p-5 text-center">
            <p className="text-sm leading-relaxed text-ink-500">
              All videos are embedded directly from YouTube and remain the
              property of their original creator. We don&apos;t claim these
              videos as our own, host any copy of them, or guarantee any
              specific baking result.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
