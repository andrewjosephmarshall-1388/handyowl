'use client'

import { useState } from 'react'

function safeJsonParse(text) {
  try {
    return JSON.parse(text)
  } catch {
    return {}
  }
}

// POSTs to /api/stripe/portal and redirects the user to the Stripe-hosted
// customer portal. Used on the pricing page and dashboard for existing
// subscribers so they can switch plans, cancel, or update payment methods
// without us having to build those flows.

export default function ManageSubscriptionButton({
  label = 'Manage subscription',
  className = '',
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleClick() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      // Defensively parse JSON — some 500s return empty bodies, and calling
      // .json() on those throws "Unexpected end of JSON input" which is a
      // confusing thing to show a user.
      const text = await res.text()
      const data = text ? safeJsonParse(text) : {}
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? `Something went wrong (HTTP ${res.status}).`)
      }
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`${className} disabled:opacity-60 disabled:cursor-not-allowed transition-all`}
      >
        {loading ? 'Redirecting…' : label}
      </button>
      {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
    </div>
  )
}
