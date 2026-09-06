import { BlogPost } from "./types";
import { BLOG_POSTS } from "@/data/blog/posts";

export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function estimateReadingTime(post: BlogPost): number {
  if (post.readingTimeMinutes) return post.readingTimeMinutes;
  const words =
    post.intro.join(" ").split(/\s+/).length +
    post.sections.reduce(
      (sum, s) => sum + s.paragraphs.join(" ").split(/\s+/).length + (s.list?.join(" ").split(/\s+/).length ?? 0),
      0
    ) +
    post.conclusion.join(" ").split(/\s+/).length;
  return Math.max(3, Math.round(words / 220));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPost(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) ?? getAllPosts()[0];
}

export function getPopularPosts(limit = 5): BlogPost[] {
  const popular = BLOG_POSTS.filter((p) => p.popular);
  const pool = popular.length ? popular : getAllPosts();
  return pool.slice(0, limit);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const bySlug = post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => !!p);

  if (bySlug.length >= limit) return bySlug.slice(0, limit);

  const sameCategory = getAllPosts().filter(
    (p) => p.category === post.category && p.slug !== post.slug && !bySlug.find((b) => b.slug === p.slug)
  );

  return [...bySlug, ...sameCategory].slice(0, limit);
}
