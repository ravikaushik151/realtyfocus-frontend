/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true, // Ensures App Router is enabled
  },

  productionBrowserSourceMaps: false,
  // trailingSlash: true,
};

module.exports = nextConfig;
