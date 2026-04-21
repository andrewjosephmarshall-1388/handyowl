import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const { email, source } = await request.json()

    const normalized = String(email ?? '').toLowerCase().trim()
    if (!normalized || !normalized.includes('@')) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    await prisma.emailCapture.upsert({
      where: { email: normalized },
      update: {}, // keep the original source/createdAt on re-submits
      create: {
        email: normalized,
        source: source ? String(source).slice(0, 64) : null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Em