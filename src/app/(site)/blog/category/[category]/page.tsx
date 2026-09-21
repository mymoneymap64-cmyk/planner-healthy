import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostCard from "@/components/BlogPostCard";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { BLOG_CATEGORIES, getCategory } from "@/data/blog/categories";
import { getPostsByCategory } from "@/lib/blog";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) return {};

  return buildMetadata({
    title: `${category.name} Articles | Natural Wellness Library Blog`,
    description: `${category.description} Browse all ${category.name.toLowerCase()} articles from the Natural Wellness Library.`,
    path: `/blog/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);

  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Blog", path: "/blog" },
          { name: category.name, path: `/blog/category/${category.slug}` },
        ])}
      />

      <section className="bg-gradient-to-b from-brand-50 to-cream section-pad !pb-12">
        <div className="container-page">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: category.name, href: `/blog/category/${category.slug}` }]} />
          <div className="mt-6">
            <SectionHeading eyebrow="Category" title={category.name} description={category.description} align="left" />
          </div>
        </div>
      </section>

      <section className="section-pad !pt-12">
        <div className="container-page">
          {posts.length === 0 ? (
            <p className="text-sm text-ink-400">No articles in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <BlogPostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
