import { SITE_DESC, SITE_NAME, SITE_URL } from '@/const';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s - ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: {
    type: 'website',
    title: { default: SITE_NAME, template: `%s - ${SITE_NAME}` },
    description: SITE_DESC,
    locale: 'en',
  },
  twitter: {
    card: 'summary',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
};
