import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/idx-wrapper/mls-search',
        destination: '/idx-wrapper/mls-search',
      },
      {
        source: '/idx-wrapper/mls-search/',
        destination: '/idx-wrapper/mls-search',
      },
    ];
  },
};

export default nextConfig;
