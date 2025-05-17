import { env, isDev, isPreview } from './env'

export const SITE_NAME = 'Windows UUP'
export const SITE_DESC = `Download Window Update files directly from Microsoft Servers and convert to ISO files`

export const PRIMARY_DOMAIN = 'uup.vercel.app'

export const SITE_DOMAIN = isDev
  ? `localhost:${env.PORT}`
  : isPreview
    ? env.VERCEL_URL
    : PRIMARY_DOMAIN

export const SITE_URL = isDev
  ? `http://${SITE_DOMAIN}/`
  : `https://${SITE_DOMAIN}/`

export const SOURCE = 'https://github.com/oviirup/windows-uup'

export const DEFAULT_THEME = 'dark'

export const CREATOR = {
  name: 'Avirup Ghosh',
  profiles: {
    twitter: {
      name: 'Twitter',
      username: 'oviirup',
      uid: '@oviirup',
      icon: 'twitter',
      url: 'https://x.com/oviirup',
    },
    github: {
      name: 'GitHub',
      username: 'oviirup',
      uid: '@oviirup',
      icon: 'github',
      url: 'https://github.com/oviirup',
    },
  },
}
