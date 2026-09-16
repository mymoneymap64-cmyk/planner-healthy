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
};

export default nextConfig;
