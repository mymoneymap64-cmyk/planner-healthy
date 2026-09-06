import Link from "next/link";
import { Clock } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { estimateReadingTime, formatDate } from "@/lib/blog";
import { getCategory } from "@/data/blog/categories";
import ResponsiveImage from "./ResponsiveImage";

export default function BlogPostCard({
  post,
  size = "default",
}: {
  post: BlogPost;
  size?: "default" | "large";
}) {
  const category = getCategory(post.category);

  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group flex flex-col overflow-hidden">
      <ResponsiveImage
        imageKey={post.imageKey}
        rounded="rounded-none"
        sizes="(min-width: 1024px) 400px, 100vw"
        className={size === "large" ? "aspect-[16/9]" : "aspect-[4/3]"}
      />
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <span className="w-fit rounded-full bg-brand-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-700">
            {category.name}
          </span>
        )}
        <h3
          className={`mt-3 font-display font-bold text-ink-900 transition-colors group-hover:text-brand-700 ${
            size === "large" ? "text-2xl" : "text-base"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-ink-400">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {estimateReadingTime(post)} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
