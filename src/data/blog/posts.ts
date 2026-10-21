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
import { article66 } from "./articles/article-66";
import { article67 } from "./articles/article-67";
import { article68 } from "./articles/article-68";
import { article69 } from "./articles/article-69";
import { article70 } from "./articles/article-70";
import { article71 } from "./articles/article-71";
import { article72 } from "./articles/article-72";
import { article73 } from "./articles/article-73";
import { article74 } from "./articles/article-74";
import { article75 } from "./articles/article-75";

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
 * As of 2026-10-20, 10 original Baking & Recipes articles (66–75) were added
 * alongside the existing 10 Mental Wellness articles — the Mental Wellness
 * catalogue was not touched, retired, or rewritten.
 *
 * As new article-NN.ts files are added under src/data/blog/articles/,
 * import and append them here.
 */
export const BLOG_POSTS: BlogPost[] = [
  article51, article52, article53, article54, article55,
  article59, article61, article63, article64, article65,
  article66, article67, article68, article69, article70,
  article71, article72, article73, article74, article75,
];
