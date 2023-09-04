/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  reactStrictMode: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.cache = true;
    return config;
  },
  optimizeFonts: true,
}

module.exports = nextConfig
