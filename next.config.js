const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 1000,
    pagesBufferLength: 1000
  },
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
    STRAPI_BACKEND_URL: process.env.STRAPI_BACKEND_URL
  },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } }
    ]
  },
  images: { domains: ['localhost'] },
  webpack: (config,options) => {
    const { dev, isServer } = options;

    // Do not run type checking twice:
     if (dev && isServer) {
       config.plugins.push(new ForkTsCheckerWebpackPlugin());
     }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

module.exports = nextConfig
