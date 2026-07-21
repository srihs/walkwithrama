import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI/verification builds to use a separate output dir
  // (NEXT_DIST_DIR=.next-verify next build) so they never clobber
  // a running dev server's .next cache.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
