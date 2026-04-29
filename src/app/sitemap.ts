import type { MetadataRoute } from 'next'
import client from '@/tina/__generated__/client'

const SITE_URL = 'https://www.titaneye.care'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  try {
    const { data } = await client.queries.pagesConnection()
    const contentPages = data.pagesConnection.edges || []

    contentPages.forEach((page) => {
      const slug = page?.node?._sys.filename
      if (!slug) return
      pages.push({
        url: `${SITE_URL}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.4,
      })
    })
  } catch {
    pages.push({
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    })
  }

  return pages
}
