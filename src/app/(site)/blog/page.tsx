import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import BlogPostCard from "@/components/BlogPostCard";
import BlogExplorer from "@/components/BlogExplorer";
import NewsletterCTA from "@/components/NewsletterCTA";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getAllPosts, getFeaturedPost, getPopularPosts } from "@/lib/blog";
import { BLOG_CATEGORIES } from "@/data/blog/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog — Wellness, Habits & Natural Health Tips | Natural Wellness Library",
  description:
    "Practical, no-fluff articles on healthy habits, nutrition, movement, sleep, and mindset — for real, busy lives.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const popular = getPopularPosts(4).filter((p) => p.slug !== featured.slug);
  const latest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <div>
      <section className="bg-gradient-to-b from-brand-50 to-cream section-pad !pb-12">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Blog"
            title="Healthy habits, explained simply"
            description="Practical, realistic articles on nutrition, movement, sleep, and consistency — written for real, busy lives, not extremes."
          />
        </div>
      </section>

      <section className="border-b border-ink-900/[0.06] bg-white py-14">
        <div className="container-page">
          <p className="mb-5 text-xs font-bold uppercase tracking-wide text-brand-600">
            Featured Article
          </p>
          <Link
            href={`/blog/${featured.slug}`}
            className="card card-hover grid overflow-hidden lg:grid-cols-2"
          >
            <ResponsiveImage
              imageKey={featured.imageKey}
              priority
              rounded="rounded-none"
              className="aspect-[16/9] lg:aspect-auto"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                {featured.excerpt}
              </p>
              <span className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-semibold text-brand-700">
                Read the article <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {popular.length > 0 && (
        <section className="section-pad !pb-10">
          <div className="container-page">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gold-600">
              <Flame size={14} /> Popular Articles
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {popular.map((p) => (
                <BlogPostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad !pt-6">
        <div className="container-page">
          <p className="mb-5 text-xs font-bold uppercase tracking-wide text-ink-400">
            Browse All Articles
          </p>
          <BlogExplorer posts={latest} categories={BLOG_CATEGORIES} />
        </div>
      </section>

      <section className="section-pad !pt-0">
        <div className="container-page">
          <NewsletterCTA />
        </div>
      </section>

      <section className="section-pad !pt-0 bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-brand-600 bg-brand-50 p-8 text-center sm:p-10">
            <h3 className="font-display text-2xl font-bold text-ink-900">
              Want the full guides, not just articles?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
              The Natural Wellness Library turns topics like these into
              complete, in-depth ebooks — each with a matching planner and
              30-day system.
            </p>
            <Link href="/checkout" className="btn-primary mt-6">
              Get the Complete Library <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
