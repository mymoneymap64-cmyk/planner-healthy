import { notFound } from "next/navigation";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import BlogArticleView from "@/components/BlogArticleView";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { getImage } from "@/data/images";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { getCategory } from "@/data/blog/categories";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const image = getImage(post.imageKey);
  return buildMetadata({
    title: `${post.title} | Natural Wellness Library`,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
    imageUrl: image.url,
    type: "article",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const image = getImage(post.imageKey);
  const category = getCategory(post.category);

  const breadcrumbItems = [
    { name: "Blog", path: "/blog" },
    ...(category ? [{ name: category.name, path: `/blog/category/${category.slug}` }] : []),
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.metaDescription,
          path: `/blog/${post.slug}`,
          imageUrl: image.url,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      {post.faqs && post.faqs.length > 0 && <JsonLd data={faqJsonLd(post.faqs)} />}

      <BlogArticleView post={post} related={related} />
    </>
  );
}
