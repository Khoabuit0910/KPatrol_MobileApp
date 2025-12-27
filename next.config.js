/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA Configuration
  reactStrictMode: true,
  
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.kpatrol.io',
      },
    ],
  },
  
  // Headers for WebRTC and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
