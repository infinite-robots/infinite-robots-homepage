import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/testimonials", destination: "/work", permanent: true }];
  },
};

export default nextConfig;
