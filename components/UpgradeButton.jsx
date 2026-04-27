'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function safeJsonParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

export default function UpgradeButton({
  plan = 'monthly',
  label = 'Upgrade to Premium',
  className = '',
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleUpgrade() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      // Signed-out users hit a 401 here — send them to login, then back to /pricing
      if (res.status === 401) {
        router.push('/login?next=/pricing')
        return
      }

      // An already-PREMIUM user gets a 409 — route them to Manage Subscription instead
      if (res.status === 409) {
        router.push('/dashboard/settings')
        return
      }

      // Defensively parse JSON — some 500s return empty bodies, and calling
      // .json() on those throws "Unexpected end of JSON input" which is a
      // confusing thing to show a user.
      const text = await res.text()
      const data = text ? safeJsonParse(text) : {}

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? `Something went wrong (HTTP ${res.status}).`)
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className={`${className} disabled:opacity-60 disabled:cursor-not-allowed transition-all`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Redirecting…
          </span>
        ) : label}
      </button>
      {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
    </div>
  )
}
