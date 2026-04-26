import { guides, categories } from '@/lib/guides'

// Next.js App Router convention: exporting a default function from app/sitemap.js
// generates /sitemap.xml at build time.
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    'https://handyowl.net'
  )
}

export default function sitemap() {
  const baseUrl = getSiteUrl()
  const now = new Date()

  const staticPages = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/guides`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/creators`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const guidePages = guides.map(g => ({
    url: `${baseUrl}/guides/${g.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryPages = categories.map(c => ({
    url: `${baseUrl}/guides?category=${c.id}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...guidePages, ...categoryPages].map(entry => ({
    ...entry,
    lastModified: now,
  }))
}
