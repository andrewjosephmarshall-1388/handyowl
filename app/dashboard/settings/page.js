'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function AccountSettingsPage() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const isPremium = session?.user?.plan === 'PREMIUM'
  const displayName = session?.user?.name || session?.user?.email?.split('@')[0] || ''
  const email = session?.user?.email || ''

  async function openBillingPortal() {
    setLoading(true)
    setMsg('')
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setMsg(data.error || 'Could not open billing portal.')
    } catch {
      setMsg('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // Loading state for the initial session fetch
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-[#2d5a3d] hover:underline">← Back to Dashboard</Link>
          <h1 className="text-2xl font-bold text-[#1a3a2a] mt-3">Account Settings</h1>
        </div>

        {/* Plan */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <h2 className="font-bold text-[#1a3a2a] mb-4">Your plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">{isPremium ? '⭐ Premium Plan' : 'Free Plan'}</p>
              <p className="text-sm text-gray-500">
                {isPremium
                  ? 'Unlimited access to every guide and tool.'
                  : '10 guides/month · limited tools'}
              </p>
            </div>
            {isPremium ? (
              <button
                onClick={openBillingPortal}
                disabled={loading}
                className="bg-[#1a3a2a] hover:bg-[#2d5a3d] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
              >
                {loading ? 'Opening…' : 'Manage plan'}
              </button>
            ) : (
              <Link
                href="/pricing"
                className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>

        {/* Billing (shown only if there's a billing relationship to manage) */}
        {isPremium && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
            <h2 className="font-bold text-[#1a3a2a] mb-1">Billing</h2>
            <p className="text-sm text-gray-500 mb-4">
              Switch between monthly and yearly, update your payment method, or cancel your subscription.
            </p>
            <button
              onClick={openBillingPortal}
              disabled={loading}
              className="border border-gray-200 hover:border-[#1a3a2a] text-gray-700 hover:text-[#1a3a2a] px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Opening…' : 'Manage billing →'}
            </button>
            {msg && <p className="text-sm text-red-600 mt-2">{msg}</p>}
          </div>
        )}

        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <h2 className="font-bold text-[#1a3a2a] mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                defaultValue={displayName}
                disabled
                title="Profile editing is coming soon"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue={email}
                disabled
                title="Email is set at signup and can't be changed here yet"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-400">Profile editing is coming soon.</p>
          </div>
        </div>

        {/* Session */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <h2 className="font-bold text-[#1a3a2a] mb-1">Session</h2>
          <p className="text-sm text-gray-500 mb-4">Sign out of Handy Owl on this device.</p>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="border border-gray-200 hover:border-[#1a3a2a] text-gray-700 hover:text-[#1a3a2a] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
          <h2 className="font-bold text-red-700 mb-1">Danger zone</h2>
          <p className="text-sm text-gray-500 mb-4">
            Account deletion isn't wired up yet. For now, email support and we'll remove your account manually.
          </p>
          <button
            disabled
            className="border border-red-200 text-red-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
            title="Coming soon"
          >
            Delete account (coming soon)
          </button>
        </div>
      </div>
    </div>
  )
}
