import { canonicalURL } from '@/lib/helpers';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: canonicalURL('/sitemap.xml'),
  };
}
