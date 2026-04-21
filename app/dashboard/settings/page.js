'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AccountSettingsPage() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function openBillingPortal() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setMsg('Could not open billing portal. Please contact support.')
    } catch {
      setMsg('Something went wrong.')
    } finally {
      setLoading(false)
    }
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
              <p className="font-semibold text-gray-800">Free Plan</p>
              <p className="text-sm text-gray-500">10 guides/month · limited tools</p>
            </div>
            <Link
              href="/pricing"
              className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
            >
              Upgrade
            </Link>
          </div>
        </div>

        {/* Billing */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <h2 className="font-bold text-[#1a3a2a] mb-1">Billing</h2>
          <p className="text-sm text-gray-500 mb-4">Manage your subscription, update payment method, or cancel.</p>
          <button
            onClick={openBillingPortal}
            disabled={loading}
            className="border border-gray-200 hover:border-[#1a3a2a] text-gray-700 hover:text-[#1a3a2a] px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Opening…' : 'Manage billing →'}
          </button>
          {msg && <p className="text-sm text-red-600 mt-2">{msg}</p>}
        </div>

        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
          <h2 className="font-bold text-[#1a3a2a] mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                defaultValue="Andrew"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="andrew.joseph.marshall@gmail.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a3d]"
              />
            </div>
            <button className="bg-[#1a3a2a] hover:bg-[#2d5a3d] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Save changes
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
          <h2 className="font-bold text-red-700 mb-1">Danger zone</h2>
          <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data.</p>
          <button className="border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}
