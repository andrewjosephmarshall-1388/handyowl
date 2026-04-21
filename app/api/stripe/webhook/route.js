import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

// This route receives events from Stripe (subscription created, updated, cancelled)
// and updates the user's plan in the database accordingly.
//
// Local testing: stripe listen --forward-to localhost:3000/api/stripe/webhook

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

// "Active-ish" statuses that should grant PREMIUM access.
// `trialing` is included so trials work if you ever enable them.
const ACTIVE_STATUSES = new Set(['active', 'trialing', 'past_due'])

function subscriptionEndsAt(subscription) {
  const ts = subscription?.current_period_end
  return typeof ts === 'number' ? new Date(ts * 1000) : null
}

/**
 * Resolve the app user id for a Stripe event, in priority order:
 *   1. metadata.userId (set on checkout & subscription creation)
 *   2. DB lookup by stripeCustomerId
 *   3. DB lookup by customer email (last resort, e.g. Google-only users who paid before login)
 */
async function resolveUserId({ metadataUserId, customerId, customerEmail }) {
  if (metadataUserId && metadataUserId !== 'anonymous') return metadataUserId

  if (customerId) {
    const byCustomer = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
      select: { id: true },
    })
    if (byCustomer) return byCustomer.id
  }

  if (customerEmail) {
    const byEmail = await prisma.user.findUnique({
      where: { email: customerEmail.toLowerCase() },
      select: { id: true },
    })
    if (byEmail) return byEmail.id
  }

  return null
}

export async function POST(request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const subscriptionId = session.subscription
        const customerId = session.customer

        const userId = await resolveUserId({
          metadataUserId: session.metadata?.userId,
          customerId,
          customerEmail: session.customer_details?.email || session.customer_email,
        })
        if (!userId) {
          console.warn(`checkout.session.completed: no matching user for customer ${customerId}`)
          break
        }

        // Retrieve the subscription to get current_period_end + status.
      