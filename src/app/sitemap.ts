import { MetadataRoute } from 'next'
import { canonicalURL } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/']

  const pageRoutes: MetadataRoute.Sitemap = pages.map((route) => ({
    url: canonicalURL(route),
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return pageRoutes
}
