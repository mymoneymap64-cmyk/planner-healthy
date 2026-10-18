import { BlogPost } from "@/lib/types";
import { article51 } from "./articles/article-51";
import { article52 } from "./articles/article-52";
import { article53 } from "./articles/article-53";
import { article54 } from "./articles/article-54";
import { article55 } from "./articles/article-55";
import { article59 } from "./articles/article-59";
import { article61 } from "./articles/article-61";
import { article63 } from "./articles/article-63";
import { article64 } from "./articles/article-64";
import { article65 } from "./articles/article-65";

/**
 * Aggregates every currently-published article data file into one list
 * consumed by src/lib/blog.ts.
 *
 * As of 2026-10-18 the blog was fully refreshed: articles 02–46 (the
 * original 42-article catalogue) were retired from public listing in favor
 * of 10 new, original Mental Wellness articles. Their source files remain
 * in src/data/blog/articles/ untouched and fully recoverable — nothing was
 * deleted — they are simply no longer imported here. Their old URLs
 * 301-redirect to /blog in next.config.mjs so no indexed link breaks.
 *
 * As new article-NN.ts files are added under src/data/blog/articles/,
 * import and append them here.
 */
export const BLOG_POSTS: BlogPost[] = [
  article51, article52, article53, article54, article55,
  article59, article61, article63, article64, article65,
];
