// next.config.ts
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // ігнорує ESLint при build
  },
  typescript: {
    ignoreBuildErrors: true,    // ігнорує TS-помилки при build
  },
};

export default nextConfig;