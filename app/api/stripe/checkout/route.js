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
      select: { id: true, email: true, stripeCustomerId: true },
    })
    if (!user) {
      return NextResponse.json({ error: 'Account not found.' }, { status: 401 })
    }

    const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

    // Reuse the Stripe customer if we've already created one — avoids duplicates
    // when a user cancels and re-subscribes.
    const customerFields = user.stripeCustomerId
      ? { customer: user.stripeCustomerId }
      : { customer_email: user.email ?? undefined }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard/upgrade-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=true`,
      ...customerFields,
      metadata: {
        userId: user.id,
        plan,
      },
      subscription_data: {
        trial_period_days: 0,
        metadata: {
          userId: user.id,
        },
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
