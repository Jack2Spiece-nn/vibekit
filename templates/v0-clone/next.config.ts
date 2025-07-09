import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Vercel deployment
  experimental: {
    serverComponentsExternalPackages: ['@inngest/realtime'],
  },
  // Disable telemetry for better build performance
  telemetry: {
    disabled: true,
  },
  // Optimize images for better performance
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Optimize for production builds
  productionBrowserSourceMaps: false,
  // Additional optimizations for Vercel free tier
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        // Vendor chunk for stable dependencies
        vendor: {
          name: 'vendors',
          chunks: 'all',
          test: /node_modules/,
          priority: 20,
        },
        // Common chunk for shared code
        common: {
          name: 'common',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    };
    
    // Reduce bundle size by excluding unnecessary polyfills
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};
