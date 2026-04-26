// Next.js App Router convention: exporting a default function from app/robots.js
// generates /robots.txt at build time. Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

// Prefers NEXT_PUBLIC_SITE_URL when set (e.g. in production), falls back to NEXTAUTH_URL,
// finally falls back to the production canonical domain. Keeps localhost out of production robots.
function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXTAUTH_URL ||
    'https://handyowl.net'
  )
}

export default function robots() {
  const baseUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Don't index internal routes: auth callbacks, dashboard pages, API routes.
        disallow: ['/api/', '/dashboard/', '/login', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
