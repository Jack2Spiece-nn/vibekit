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
};
