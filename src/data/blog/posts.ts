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
import { article76 } from "./articles/article-76";
import { article77 } from "./articles/article-77";
import { article78 } from "./articles/article-78";
import { article79 } from "./articles/article-79";
import { article80 } from "./articles/article-80";
import { article81 } from "./articles/article-81";
import { article82 } from "./articles/article-82";
import { article83 } from "./articles/article-83";
import { article84 } from "./articles/article-84";
import { article85 } from "./articles/article-85";
import { article86 } from "./articles/article-86";
import { article87 } from "./articles/article-87";
import { article88 } from "./articles/article-88";
import { article89 } from "./articles/article-89";
import { article90 } from "./articles/article-90";
import { article91 } from "./articles/article-91";
import { article92 } from "./articles/article-92";
import { article93 } from "./articles/article-93";
import { article94 } from "./articles/article-94";
import { article95 } from "./articles/article-95";
import { article96 } from "./articles/article-96";
import { article97 } from "./articles/article-97";
import { article98 } from "./articles/article-98";
import { article99 } from "./articles/article-99";
import { article100 } from "./articles/article-100";
import { article101 } from "./articles/article-101";
import { article102 } from "./articles/article-102";
import { article103 } from "./articles/article-103";
import { article104 } from "./articles/article-104";
import { article105 } from "./articles/article-105";
import { article106 } from "./articles/article-106";
import { article107 } from "./articles/article-107";
import { article108 } from "./articles/article-108";
import { article109 } from "./articles/article-109";
import { article110 } from "./articles/article-110";
import { article111 } from "./articles/article-111";
import { article112 } from "./articles/article-112";
import { article113 } from "./articles/article-113";
import { article114 } from "./articles/article-114";
import { article115 } from "./articles/article-115";
import { article116 } from "./articles/article-116";
import { article117 } from "./articles/article-117";
import { article118 } from "./articles/article-118";
import { article119 } from "./articles/article-119";
import { article120 } from "./articles/article-120";
import { article121 } from "./articles/article-121";
import { article122 } from "./articles/article-122";
import { article123 } from "./articles/article-123";
import { article124 } from "./articles/article-124";
import { article125 } from "./articles/article-125";

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
 * As of 2026-10-22, 50 more original articles (76–125) were added: 35 baking
 * articles, 10 baking-technique/ingredient reference articles, and 5
 * Mental Wellness articles exploring the baking/wellness crossover — all
 * checked against the existing 20-article catalogue (and the retired
 * 42-article catalogue) for topic overlap before writing.
 *
 * As new article-NN.ts files are added under src/data/blog/articles/,
 * import and append them here.
 */
export const BLOG_POSTS: BlogPost[] = [
  article51, article52, article53, article54, article55,
  article59, article61, article63, article64, article65,
  article66, article67, article68, article69, article70,
  article71, article72, article73, article74, article75,
  article76, article77, article78, article79, article80,
  article81, article82, article83, article84, article85,
  article86, article87, article88, article89, article90,
  article91, article92, article93, article94, article95,
  article96, article97, article98, article99, article100,
  article101, article102, article103, article104, article105,
  article106, article107, article108, article109, article110,
  article111, article112, article113, article114, article115,
  article116, article117, article118, article119, article120,
  article121, article122, article123, article124, article125,
];
