/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Netlify
  output: 'export',
  
  // PWA Configuration
  reactStrictMode: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slash for static export
  trailingSlash: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
};

module.exports = nextConfig;
