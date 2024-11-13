import './src/env.js'; // verify environment variables on build

/** @type {import('next').NextConfig} */
const nextConfig = {
  // disable eslint & typescript during build
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  logging: {
    fetches: { fullUrl: true, hmrRefreshes: true }, //enable fetch logging
  },
};

export default nextConfig;
