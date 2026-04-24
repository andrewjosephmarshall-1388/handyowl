import { NextResponse } from 'next/server'

// Handy Owl — referral-link attribution middleware
//
// When a visitor lands on any page with ?ref=<creator-slug>, this captures the
// slug into an httpOnly cookie (30-day lifetime). At signup, the API route
// reads the cookie and writes the slug into User.referredBy, so the creator
// gets credited for the attribution.
//
// See docs/creator-partnership.md for full rev-share terms.

const COOKIE_NAME = 'handy_owl_ref'
const COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60 // 30 days
const REF_PARAM = 'ref'

// Keep slugs simple on purpose: lowercase letters, digits, and dashes only.
// Rejects injected values, URL-encoded tricks, spaces, and accidental garbage.
const VALID_SLUG = /^[a-z0-9-]{2,48}$/

export function middleware(request) {
  const refParam = request.nextUrl.searchParams.get(REF_PARAM)

  // No ref param → nothing to do. Pass through.
  if (!refParam) return NextResponse.next()

  const normalized = refParam.trim().toLowerCase()

  // Malformed slug — ignore silently rather than writing a cookie that'd
  // never match anything useful.
  if (!VALID_SLUG.test(normalized)) return NextResponse.next()

  const response = NextResponse.next()
  response.cookies.set({
    name: COOKIE_NAME,
    value: normalized,
    maxAge: COOKIE_MAX_AGE_SECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  return response
}

// Only run on page routes, not on api routes or Next.js internals. Referral
// attribution is a page-visit concern, not an API concern.
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *   - /api/*  (API routes)
     *   - /_next/static (static files)
     *   - /_next/image (image optimization)
     *   - /favicon.ico
     *   - Any path ending in a common static asset extension
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
}
