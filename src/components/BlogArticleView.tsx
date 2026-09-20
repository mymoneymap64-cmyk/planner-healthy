import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { estimateReadingTime, formatDate, slugifyHeading } from "@/lib/blog";
import { getCategory } from "@/data/blog/categories";
import { SITE_NAME } from "@/lib/seo";
import Breadcrumbs from "./Breadcrumbs";
import TableOfContents from "./TableOfContents";
import ResponsiveImage from "./ResponsiveImage";
import BlogPostCard from "./BlogPostCard";
import FAQAccordion from "./FAQAccordion";
import { RichText } from "./RichText";

export default function BlogArticleView({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const category = getCategory(post.category);

  return (
    <article>
      <section className="bg-gradient-to-b from-brand-50 to-cream pb-10 pt-8 sm:pt-12">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              ...(category ? [{ name: category.name, href: `/blog/category/${category.slug}` }] : []),
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <div className="mx-auto mt-6 max-w-3xl">
            {category && (
              <Link
                href={`/blog/category/${category.slug}`}
                className="eyebrow inline-block hover:bg-brand-200"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-4 font-display text-3xl font-bold text-balance text-ink-900 sm:text-4xl lg:text-5xl">
              {post.h1}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
              <span className="font-semibold text-ink-700">{SITE_NAME}</span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} /> {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {estimateReadingTime(post)} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page">
        <div className="mx-auto -mt-4 max-w-3xl">
          <ResponsiveImage
            imageKey={post.imageKey}
            priority
            className="aspect-[16/9] shadow-card"
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>
      </div>

      <section className="section-pad !pt-12">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="mx-auto w-full max-w-3xl lg:mx-0">
            <div className="space-y-4">
              {post.intro.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink-700">
                  <RichText text={p} />
                </p>
              ))}
            </div>

            {/* HBAgency In-Article placement (ID 342812) — exact markup/classes
                as provided, unmodified. */}
            <div className="hb-ad-inpage">
              <div className="hb-ad-inner">
                <div className="hbagency_cls hbagency_space_342812" />
              </div>
            </div>

            <div className="mt-8 lg:hidden">
              <TableOfContents sections={post.sections} />
            </div>

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => {
                const HeadingTag = section.level === 2 ? "h2" : "h3";
                return (
                  <div key={section.heading} id={slugifyHeading(section.heading)} className="scroll-mt-24">
                    <HeadingTag
                      className={
                        section.level === 2
                          ? "font-display text-2xl font-bold text-ink-900"
                          : "font-display text-xl font-bold text-ink-900"
                      }
                    >
                      {section.heading}
                    </HeadingTag>
                    <div className="mt-3 space-y-4">
                      {section.paragraphs.map((p, i) => (
                        <p key={i} className="text-base leading-relaxed text-ink-700">
                          <RichText text={p} />
                        </p>
                      ))}
                    </div>
                    {section.list && (
                      <ul className="mt-4 space-y-2.5">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex gap-2.5 text-base leading-relaxed text-ink-700">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                            <span><RichText text={item} /></span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-ink-900">
                  Frequently Asked Questions
                </h2>
                <div className="mt-4">
                  <FAQAccordion items={post.faqs} />
                </div>
              </div>
            )}

            <div className="mt-10 space-y-4">
              {post.conclusion.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-700">
                  <RichText text={p} />
                </p>
              ))}
            </div>

            <div className="mt-10 rounded-3xl bg-brand-900 p-7 text-white sm:p-9">
              <p className="text-base leading-relaxed text-brand-50">
                {post.ctaText ??
                  "Want more practical guidance like this? Browse the Natural Wellness Library of wellness ebooks."}
              </p>
              <Link href="/library" className="btn-gold mt-5">
                Browse the Library <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents sections={post.sections} />
              <div className="card p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">
                  The Complete Library
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  7 wellness guides with matching planners and 30-day
                  systems, plus 2 free bonus guides.
                </p>
                <Link href="/checkout" className="btn-primary mt-4 w-full !text-xs">
                  Get the Library
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad !pt-0 bg-white">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-ink-900">Related Articles</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <BlogPostCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
