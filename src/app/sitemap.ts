import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getActiveCategories, getAllPosts, getLatestModified, getPostLastModified, getPostsByCategory } from "@/lib/blog";
import { ALL_PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only pages with a tracked content date get a lastModified. Static pages
  // (home, library, FAQ, ...) have no reliable modification date, so the
  // field is omitted rather than reporting the build time for every URL.
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/library`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/wellness-system`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/healthy-planner`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/bonuses`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: getLatestModified(posts), changeFrequency: "weekly", priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = ALL_PRODUCTS.map((p) => ({
    url: `${SITE_URL}/library/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getActiveCategories().map((c) => ({
    url: `${SITE_URL}/blog/category/${c.slug}`,
    lastModified: getLatestModified(getPostsByCategory(c.slug)),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: getPostLastModified(post),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
}
