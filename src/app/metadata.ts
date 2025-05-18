import { Metadata, Viewport } from 'next'
import { SITE_DESC, SITE_NAME, SITE_URL } from '@/config'
import { canonicalURL } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s - ${SITE_NAME}` },
  description: SITE_DESC,
  alternates: {
    canonical: canonicalURL('/'),
  },
  openGraph: {
    type: 'website',
    title: { default: SITE_NAME, template: `%s - ${SITE_NAME}` },
    description: SITE_DESC,
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: { default: SITE_NAME, template: `%s - ${SITE_NAME}` },
    description: SITE_DESC,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: [{ url: '/favicon.ico', sizes: '32' }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { color: '#ffffff' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}
