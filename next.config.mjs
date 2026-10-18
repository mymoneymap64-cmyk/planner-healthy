/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    // The protected file route reads content/**/*.pdf using a path built
    // from request params, which Next's build-time file tracer can't
    // follow statically. Without this, the serverless function bundle
    // would silently omit those PDFs in production even though everything
    // works locally.
    outputFileTracingIncludes: {
      "/api/files/[token]/[slug]/[asset]": ["./content/**/*"],
    },
  },
  async redirects() {
    // statusCode 301 (not `permanent`, which is a 308) keeps these as
    // classic permanent redirects for search engines.
    //
    // 2026-10-18 blog refresh: the original 42-article catalogue (plus two
    // already-merged older slugs) was retired from public listing in favor
    // of 10 new Mental Wellness articles — see src/data/blog/posts.ts. Their
    // source files are untouched in src/data/blog/articles/ if any are ever
    // republished.
    //
    // The two content pillars don't overlap much (the old catalogue was
    // habits/nutrition/fitness/sleep/mindset fundamentals; the new one is
    // stress-and-relaxation techniques). Per 2026-10-18 review: the 39
    // retired article URLs with no genuine topical successor are NOT
    // redirected here — redirecting a specific article's URL to an
    // unrelated blog index is itself a thin/misleading redirect, worse for
    // both users and SEO than a clean, honest 404. They fall through to
    // src/app/(site)/not-found.tsx (branded, links to /blog and /library,
    // lists current articles) via the existing notFound() call in
    // blog/[slug]/page.tsx — no code change needed there, since those
    // slugs are simply no longer in BLOG_POSTS. Their source files remain
    // untouched in src/data/blog/articles/.
    //
    // A handful of articles DO have a genuine partial successor and get a
    // specific redirect instead of falling through to 404:
    const toMentalWellnessCategory = [
      "how-to-build-a-healthy-evening-routine",
      "how-sleep-affects-your-daily-routine",
      "how-to-create-a-better-sleep-routine",
      "simple-ways-to-improve-your-sleep-habits",
    ];

    // Categories with no published articles after the refresh would
    // otherwise 404 via getActiveCategories() in src/lib/blog.ts (its own
    // category page also calls notFound() once a category has zero posts).
    // Per 2026-10-18 review: each of the 7 retired categories was checked
    // individually against (a) the new 10 articles and (b) the rest of the
    // site (products, /wellness-system) for a destination that actually
    // serves the category's real intent — a blanket "send it to /blog"
    // was rejected as too imprecise once several categories turned out to
    // have a genuinely better match elsewhere on the site:
    //  - "healthy-habits" ("building habits that actually stick") and
    //    "mindset" ("motivation, discipline, staying consistent") both
    //    describe exactly what /wellness-system is: the planner + 30-day
    //    system feature that turns a guide into a daily habit. Neither
    //    maps to a specific blog article, but this is a real page that
    //    directly serves that intent, not a generic fallback.
    //  - "nutrition" and "meal-planning" have no blog successor, but the
    //    Healthy Eating Guide product ("real food, balanced meals... a
    //    matching planner and 30-day meal plan") directly serves that
    //    search intent — a real, on-topic page beats a mismatched blog
    //    index.
    //  - "walking-movement" maps to the one new article that's genuinely
    //    about walking ("A Short Walk to Clear Your Head"), the same
    //    article already used for the "stay active during a busy day"
    //    article redirect above.
    //  - "lifestyle" ("morning/evening routines, everyday self-care")
    //    gets the Mental Wellness category — several new articles are
    //    literally self-care/evening-wind-down practices, the same
    //    reasoning already used for the evening-routine and sleep article
    //    redirects above. (Morning routines specifically have no
    //    successor; this is a partial match, not a perfect one.)
    //  - "fitness" ("beginner-friendly workouts and exercise guidance")
    //    has no match anywhere on the site — no blog content and no
    //    fitness/workout product exist. Forcing this to /blog or to an
    //    unrelated product would be the exact kind of thin, misleading
    //    redirect this review was meant to catch, so it is deliberately
    //    left out of this list and falls through to the branded 404.
    const categoryDestinations = {
      "healthy-habits": "/wellness-system",
      "mindset": "/wellness-system",
      "nutrition": "/library/healthy-eating-guide",
      "meal-planning": "/library/healthy-eating-guide",
      "walking-movement": "/blog/short-walk-to-clear-your-head",
      "lifestyle": "/blog/category/mental-wellness",
      // "fitness" intentionally omitted — see note above; falls through to
      // the branded 404.
    };

    return [
      ...toMentalWellnessCategory.map((source) => ({
        source: `/blog/${source}`,
        destination: "/blog/category/mental-wellness",
        statusCode: 301,
      })),
      {
        source: "/blog/how-to-stay-active-during-a-busy-day",
        destination: "/blog/short-walk-to-clear-your-head",
        statusCode: 301,
      },
      ...Object.entries(categoryDestinations).map(([source, destination]) => ({
        source: `/blog/category/${source}`,
        destination,
        statusCode: 301,
      })),
      {
        source: "/blog/category/sleep",
        destination: "/blog/category/mental-wellness",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Private-order URLs contain unguessable tokens in the path
          // (e.g. /reader/<token>/...); a permissive referrer policy could
          // leak that token to a third-party resource loaded on the page.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
