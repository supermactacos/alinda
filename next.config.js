/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async headers() {
    return [
      {
        source: '/idx-wrapper/mls-search',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
          {
            key: 'Content-Type',
            value: 'text/html',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 