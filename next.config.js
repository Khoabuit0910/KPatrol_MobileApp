/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA Configuration
  reactStrictMode: true,
  
  // Image optimization for Netlify
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.kpatrol.io',
      },
      {
        protocol: 'https',
        hostname: '**.netlify.app',
      },
    ],
  },
  
  // Trailing slash for static export
  trailingSlash: true,
  
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
            value: 'credentialless',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
