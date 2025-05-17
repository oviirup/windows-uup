import '@/env'
import type { NextConfig } from 'next'

const config: NextConfig = {
  // disable eslint & typescript during build
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  //enable fetch logging
  logging: {
    fetches: { fullUrl: true, hmrRefreshes: true },
  },
  // miscellaneous
  devIndicators: false,
}

export default config
