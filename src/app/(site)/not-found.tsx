import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

/**
 * Branded 404 for the public site. Hit directly for any URL Next's router
 * can't match, and also returned (via notFound()) for retired blog article
 * and category URLs that have no genuinely relevant replacement — see the
 * redirect comments in next.config.mjs for which ones redirect instead of
 * landing here.
 */
export default function NotFound() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="section-pad">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-ink-950 font-display text-lg font-black text-white mx-auto">
            N
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-500">
            The page you&apos;re looking for may have been moved or retired. The
            blog was recently refreshed with a new set of articles — browse
            the current ones below, or head back to the blog or library.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/blog" className="btn-primary">
              Browse the Blog <ArrowRight size={16} />
            </Link>
            <Link href="/library" className="btn-secondary">
              Browse the Library
            </Link>
          </div>
        </div>

        {recentPosts.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl">
            <p className="mb-6 text-center text-xs font-bold uppercase tracking-wide text-ink-400">
              Recent Articles
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card card-hover group overflow-hidden"
                >
                  <ResponsiveImage
                    imageKey={post.imageKey}
                    rounded="rounded-none"
                    className="aspect-[4/3]"
                    sizes="(min-width: 640px) 320px, 100vw"
                  />
                  <div className="p-5">
                    <h2 className="font-display text-sm font-bold text-ink-900 transition-colors group-hover:text-brand-700">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-xs text-ink-400">{formatDate(post.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
