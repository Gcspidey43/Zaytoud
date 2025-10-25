import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 Next.js 热重载，由 nodemon 处理重编译
  reactStrictMode: false,
  devIndicators: false,
  // Configuration for Cloudflare Pages compatibility
  trailingSlash: true, // Ensures consistent URL handling
  images: {
    unoptimized: true, // Required for Cloudflare Pages to handle images properly
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ['**/*'], // 忽略所有文件变化
      };
    }
    
    // Completely disable webpack cache in production to avoid large pack files
    if (!dev) {
      config.cache = false;
      
      // Additional optimizations for smaller bundles
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
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

      // For client-side bundles
      if (!isServer) {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors-client',
              chunks: 'all',
              priority: 20,
              maxSize: 24000000, // 24MB - just under the 25MB limit
            }
          }
        };
      } else {
        // For server-side bundles
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors-server',
              chunks: 'all',
              priority: 20,
              maxSize: 24000000, // 24MB - just under the 25MB limit
            }
          }
        };
      }
    }
    
    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;