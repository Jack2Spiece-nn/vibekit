import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Ignore optional OpenTelemetry dependencies that cause warnings
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push({
        '@opentelemetry/exporter-jaeger': 'commonjs @opentelemetry/exporter-jaeger',
        '@opentelemetry/winston-transport': 'commonjs @opentelemetry/winston-transport',
      });
    }
    
    // Ignore warnings for missing optional dependencies
    config.ignoreWarnings = [
      {
        module: /@opentelemetry\/exporter-jaeger/,
      },
      {
        module: /@opentelemetry\/winston-transport/,
      },
    ];
    
    return config;
  },
};

export default nextConfig;
