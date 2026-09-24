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
    // Two overlapping articles were consolidated into their stronger
    // counterparts. statusCode 301 (not `permanent`, which is a 308) keeps
    // these as classic permanent redirects for search engines.
    return [
      {
        source: "/blog/how-to-make-healthy-habits-easier-to-follow",
        destination: "/blog/how-to-build-healthy-habits-that-actually-last",
        statusCode: 301,
      },
      {
        source: "/blog/how-to-prepare-for-a-healthy-week",
        destination: "/blog/how-to-meal-prep-for-a-busy-week",
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
