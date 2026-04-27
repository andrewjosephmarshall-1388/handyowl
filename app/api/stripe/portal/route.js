import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import stripe from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true },
    })

    if (!user?.stripeCustomerId) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 400 })
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${baseUrl}/dashboard/settings`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (err) {
    console.error('Stripe portal error:', err)
    // Stripe error code "resource_missing" means the customer doesn't exist
    // in this Stripe mode (typically: test-mode customer ID lingering after
    // switching to live mode). Surface a clearer message for that case.
    const message =
      err?.code === 'resource_missing'
        ? 'Your billing account is out of sync with Stripe. Please contact support.'
        : err?.message ?? 'Could not open billing portal.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
