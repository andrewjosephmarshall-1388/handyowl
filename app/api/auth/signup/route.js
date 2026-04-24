import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

// POST /api/auth/signup
// Body: { email, password, name? }
// Creates a FREE-plan user with a bcrypt-hashed password.
// Does NOT sign them in — the login page calls signIn() right after.
//
// Also captures the creator referral attribution from the handy_owl_ref cookie
// (set by middleware.js when a visitor arrives via ?ref=<creator-slug>).
// See docs/creator-partnership.md for rev-share terms.

const REF_COOKIE = 'handy_owl_ref'

export async function POST(request) {
  try {
    const body = await request.json()
    const email = String(body?.email ?? '').toLowerCase().trim()
    const password = String(body?.password ?? '')
    const name = body?.name ? String(body.name).trim() : null

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters.' },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      // Don't leak whether the account was Google-only vs password — return a generic message.
      return NextResponse.json(
        { error: 'An account with that email already exists. Try signing in.' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    // Read referral cookie (if any) and persist for rev-share attribution.
    const cookieStore = cookies()
    const referralCookie = cookieStore.get(REF_COOKIE)
    const referredBy = referralCookie?.value || null

    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        plan: 'FREE',
        referredBy,
        referredAt: referredBy ? new Date() : null,
      },
    })

    // Clear the cookie now that it's been persisted. Prevents stale attribution
    // if the user signs up for a second account later from the same browser.
    const response = NextResponse.json({ success: true })
    if (referredBy) {
      response.cookies.set({
        name: REF_COOKIE,
        value: '',
        maxAge: 0,
        path: '/',
      })
    }
    return response
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
