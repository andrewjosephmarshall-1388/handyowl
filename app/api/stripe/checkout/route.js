import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import stripe from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

// Price IDs live in .env.local:
//   STRIPE_PRICE_MONTHLY = price_xxx  ($7.99/mo)
//   STRIPE_PRICE_YEARLY  = price_xxx  ($74/yr)

export async function POST(request) {
  try {
    const { plan } = await request.json() // 'monthly' | 'yearly'
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You need to be signed in to subscribe.' },
        { status: 401 }
      )
    }

    const priceId =
      plan === 'yearly'
        ? process.env.STRIPE_PRICE_YEARLY
        : process.env.STRIPE_PRICE_MONTHLY

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured.' },
        { status: 500 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        subscriptionStatus: true,
      },
    })
    if (!user) {
      return NextResponse.json({ error: 'Account not found.' }, { status: 401 })
    }

    // Prevent double-subscribe. If the user already has an active subscription,
    // they should switch plans via the billing portal, not create a second one.
    const ACTIVE_STATUSES = ['active', 'trialing', 'past_due']
    if (user.stripeSubscriptionId && ACTIVE_STATUSES.includes(user.subscriptionStatus)) {
      return NextResponse.json(
        {
          error:
            'You already have an active subscri