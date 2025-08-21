// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No need for outputFileTracingRoot in a single-project setup.
  // If you ever *do* use a monorepo or nested workspace, we can re-add a version-appropriate config.
};

export default nextConfig;
