import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // Ensures consistent URLs
  reactStrictMode: false,
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Cloudflare Pages doesn’t support Next image optimization
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Provide fallbacks for server-side environment
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        buffer: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        constants: false,
      };
    }
    
    // Add DefinePlugin to handle browser globals during build
    config.plugins = config.plugins || [];
    const webpack = require('webpack');
    config.plugins.push(
      new webpack.DefinePlugin({
        'global': 'globalThis',
        'window': 'globalThis',
        'self': 'globalThis',
      })
    );

    return config;
  },
  serverExternalPackages: [
    "framer-motion",
    "react-syntax-highlighter",
    "sharp"
  ]
};

export default nextConfig;
