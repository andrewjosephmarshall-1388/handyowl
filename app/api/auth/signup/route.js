import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

// POST /api/auth/signup
// Body: { email, password, name? }
// Creates a FREE-plan user with a bcrypt-hashed password.
// Does NOT sign them in — the login page calls signIn() right after.

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

    await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        plan: 'FREE',
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
