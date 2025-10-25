import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ⬅️ THIS is crucial for Cloudflare Pages
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
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ["**/*"], // Disable webpack hot reload
      };
    }

    if (!dev) {
      config.cache = false;

      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 10,
          maxAsyncRequests: 10,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            defaultVendor: {
              minChunks: 2,
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
          },
        },
        minimize: true,
      };

      if (!isServer) {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors-client",
              chunks: "all",
              priority: 20,
              maxSize: 24000000,
            },
          },
        };
      } else {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors-server",
              chunks: "all",
              priority: 20,
              maxSize: 24000000,
            },
          },
        };
      }
    }

    return config;
  },
};

export default nextConfig;
