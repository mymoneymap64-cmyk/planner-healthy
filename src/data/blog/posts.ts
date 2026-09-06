import { BlogPost } from "@/lib/types";
import { article02 } from "./articles/article-02";
import { article03 } from "./articles/article-03";
import { article04 } from "./articles/article-04";
import { article05 } from "./articles/article-05";
import { article06 } from "./articles/article-06";
import { article07 } from "./articles/article-07";
import { article08 } from "./articles/article-08";
import { article09 } from "./articles/article-09";
import { article10 } from "./articles/article-10";
import { article11 } from "./articles/article-11";
import { article12 } from "./articles/article-12";
import { article13 } from "./articles/article-13";
import { article14 } from "./articles/article-14";
import { article15 } from "./articles/article-15";
import { article16 } from "./articles/article-16";
import { article17 } from "./articles/article-17";
import { article18 } from "./articles/article-18";
import { article19 } from "./articles/article-19";
import { article20 } from "./articles/article-20";
import { article21 } from "./articles/article-21";
import { article22 } from "./articles/article-22";
import { article23 } from "./articles/article-23";
import { article24 } from "./articles/article-24";
import { article25 } from "./articles/article-25";
import { article26 } from "./articles/article-26";
import { article27 } from "./articles/article-27";
import { article28 } from "./articles/article-28";
import { article29 } from "./articles/article-29";
import { article30 } from "./articles/article-30";
import { article31 } from "./articles/article-31";
import { article32 } from "./articles/article-32";
import { article33 } from "./articles/article-33";
import { article34 } from "./articles/article-34";
import { article35 } from "./articles/article-35";
import { article36 } from "./articles/article-36";
import { article37 } from "./articles/article-37";
import { article38 } from "./articles/article-38";
import { article41 } from "./articles/article-41";
import { article42 } from "./articles/article-42";
import { article43 } from "./articles/article-43";
import { article44 } from "./articles/article-44";
import { article45 } from "./articles/article-45";
import { article46 } from "./articles/article-46";
import { article47 } from "./articles/article-47";

/**
 * Aggregates every surviving article data file into one list consumed by
 * src/lib/blog.ts. Articles 01, 39, 40, 48, 49, 50 were unpublished because
 * they were built entirely around the retired 21-Day Transformation
 * product. As new article-NN.ts files are added under
 * src/data/blog/articles/, import and append them here.
 */
export const BLOG_POSTS: BlogPost[] = [
  article02, article03, article04, article05,
  article06, article07, article08, article09, article10,
  article11, article12, article13, article14, article15,
  article16, article17, article18, article19, article20,
  article21, article22, article23, article24, article25,
  article26, article27, article28, article29, article30,
  article31, article32, article33, article34, article35,
  article36, article37, article38, article41,
  article42, article43, article44, article45,
  article46, article47,
];
