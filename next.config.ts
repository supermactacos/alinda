import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/idx-wrapper/mls-search',
        destination: '/idx-wrapper/mls-search',
      },
    ];
  },
};

export default nextConfig;
