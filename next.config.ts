import { build } from '@oviirup/sprite'
import { isDev } from '@/env'
import type { NextConfig } from 'next'

// build sprite files once
if (!process.env.sprite_build_complete) {
  build({ watch: isDev })
  process.env.sprite_build_complete = 'TRUE'
}

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
