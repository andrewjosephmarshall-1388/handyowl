'use client'

import { useState } from 'react'
import Link from 'next/link'
import UpgradeButton from './UpgradeButton'
import ManageSubscriptionButton from './ManageSubscriptionButton'

// Renders the interior of the Premium pricing card: a functional Monthly/Annual
// toggle, price display driven by the toggle, a features list, and a CTA that
// branches on auth + subscription status.
//
// mode: 'premium' | 'authed' | 'anon'

export default function PremiumPricingCTA({ mode = 'anon', features = [] }) {
  const [plan, setPlan] = useState('monthly')
  const isMonthly = plan === 'monthly'

  // Yearly price ($74) works out to ~$6.17/mo — show the per-month equivalent
  // so the comparison with monthly is apples-to-apples.
  const perMonthDisplay = isMonthly ? '$7.99' : '$6.17'
  const billingSubtext = isMonthly
    ? 'Billed monthly. Cancel anytime.'
    : '$74 billed once a year — save 23%.'

  return (
    <>
      {/* Billing toggle */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex bg-white/10 rounded-lg p-1 gap-1" role="tablist" aria-label="Billing period">
          <button
            type="button"
            role="tab"
            aria-selected={isMonthly}
            onClick={() => setPlan('monthly')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              isMonthly ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isMonthly}
            onClick={() => setPlan('yearly')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              !isMonthly ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            Annual
          </button>
        </div>
        <span className="text-amber-400 text-xs font-semibold">Save 23% annually</span>
      </div>

      {/* Price */}
      <div className="mb-2">
        <span className="text-4xl font-bold text-white">{perMonthDisplay}</span>
        <span className="text-white/50 ml-1">/ month</span>
      </div>
      <p className="text-sm text-amber-400 mb-6">{billingSubtext}</p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map(f => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/80">
            <span className="text-amber-400 mt-0.5">✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {mode === 'premium' ? (
        <>
          <ManageSubscriptionButton
            label="Manage your subscription"
            className="w-full block text-center bg-amber-500 hover:bg-amber-400 text-white py-3 rounded-xl font-bold"
          />
          <p className="text-center text-xs text-white/40 mt-3">
            Switch plans, update payment, or cancel anytime.
          </p>
        </>
      ) : mode === 'authed' ? (
        <>
          <UpgradeButton
            plan={plan}
            label={
              isMonthly
                ? 'Start Premium — $7.99/mo'
                : 'Start Premium — $74/year'
            }
            className="w-full block text-center bg-amber-500 hover:bg-amber-400 text-white py-3 rounded-xl font-bold"
          />
          <p className="text-center text-xs text-white/40 mt-3">
            Cancel anytime. 30-day money-back guarantee.
          </p>
        </>
      ) : (
        <>
          <Link
            href="/login?next=/pricing"
            className="w-full block text-center bg-amber-500 hover:bg-amber-400 text-white py-3 rounded-xl font-bold"
          >
            Sign up to subscribe
          </Link>
          <p className="text-center text-xs text-white/40 mt-3">
            Free to sign up. Add payment only when you're ready.
          </p>
        </>
      )}
    </>
  )
}
