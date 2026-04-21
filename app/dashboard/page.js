'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { guides, categories } from '@/lib/guides'
import ManageSubscriptionButton from '@/components/ManageSubscriptionButton'

const savedGuides = guides.slice(0, 3)
const inProgressGuide = guides[0]
const recentGuides = guides.slice(0, 6)

const categoryColors = {
  plumbing: 'bg-blue-100 text-blue-700',
  electrical: 'bg-yellow-100 text-yellow-700',
  hvac: 'bg-orange-100 text-orange-700',
  flooring: 'bg-amber-100 text-amber-700',
  painting: 'bg-purple-100 text-purple-700',
  landscaping: 'bg-green-100 text-green-700',
  appliances: 'bg-red-100 text-red-700',
  carpentry: 'bg-stone-100 text-stone-700',
}

const navItems = [
  { href: '/dashboard', label: 'Home', icon: '🏠' },
  { href: '/guides', label: 'Browse Guides', icon: '📚' },
  { href: '/dashboard/saved', label: 'Saved', icon: '🔖' },
  { href: '/dashboard/progress', label: 'In Progress', icon: '🔧' },
  { href: '/pricing', label: 'Upgrade', icon: '⭐' },
]

export default function DashboardPage() {
  const { data: session } = useSession()
  const isPremium = session?.user?.plan === 'PREMIUM'
  const displayName = session?.user?.name || session?.user?.email?.split('@')[0] || 'there'
  const initial = (displayName[0] || 'A').toUpperCase()
  const [activeCategory, setActiveCategory] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const filtered = activeCategory === 'all'
    ? recentGuides
    : recentGuides.filter(g => g.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-[#1a3a2a] text-white flex flex-col min-h-screen fixed top-0 left-0 z-40`}>
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🦉</span>
              <span className="font-bold text-lg tracking-tight">Handy Owl</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white/60 hover:text-white p-1 rounded"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm font-medium text-white/80 group-hover:text-white">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Plan box */}
        {sidebarOpen && (
          isPremium ? (
            <div className="p-4 m-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <p className="text-xs text-emerald-300 font-semibold mb-1">⭐ Premium</p>
              <p className="text-xs text-white/70 mb-3">Full access to every guide and tool.</p>
              <ManageSubscriptionButton
                label="Manage subscription"
                className="w-full block text-center text-xs font-bold bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg"
              />
            </div>
          ) : (
            <div className="p-4 m-3 bg-amber-500/20 border border-amber-500/30 rounded-xl">
              <p className="text-xs text-amber-300 font-semibold mb-1">Free Plan</p>
              <p className="text-xs text-white/70 mb-3">Unlock all 200+ guides and cost tools</p>
              <Link
                href="/pricing"
                className="block text-center text-xs font-bold bg-amber-500 hover:bg-amber-400 text-white py-2 px-3 rounded-lg transition-colors"
              >
                Upgrade — $7.99/mo
              </Link>
            </div>
          )
        )}

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-sm font-bold text-white">
              {initial}
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-sm font-medium text-white">{displayName}</p>
                <p className="text-xs text-white/50">{isPremium ? 'Premium plan' : 'Free plan'}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#1a3a2a]">Good morning, {displayName} 👋</h1>
              <p className="text-sm text-gray-500">Here's what's happening with your home projects</p>
            </div>
            <Link
              href="/guides"
              className="bg-[#1a3a2a] hover:bg-[#2d5a3d] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Browse Guides
            </Link>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Savings', value: '$847', icon: '💰', color: 'text-green-600' },
              { label: 'Projects Done', value: '6', icon: '✅', color: 'text-blue-600' },
              { label: 'Guides Saved', value: '12', icon: '🔖', color: 'text-purple-600' },
              { label: 'New Guides', value: '8', icon: '🆕', color: 'text-amber-600' },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className="text-2xl mb-1">{stat.icon}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Continue where you left off */}
          <div>
            <h2 className="text-lg font-bold text-[#1a3a2a] mb-3">Continue where you left off</h2>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row gap-5 items-start">
              <div className="flex-1">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {inProgressGuide.category}
                </span>
                <h3 className="text-lg font-bold text-[#1a3a2a] mt-2 mb-1">{inProgressGuide.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{inProgressGuide.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>⏱ {inProgressGuide.duration}</span>
                  <span>💰 {inProgressGuide.cost}</span>
                  <span>Step 2 of {inProgressGuide.steps?.length ?? 5}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <div className="bg-[#2d5a3d] h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <Link
                  href={`/guides/${inProgressGuide.slug}`}
                  className="inline-block bg-[#1a3a2a] hover:bg-[#2d5a3d] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Continue Guide →
                </Link>
              </div>
            </div>
          </div>

          {/* Browse guides */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1a3a2a]">Browse Guides</h2>
              <Link href="/guides" className="text-sm text-[#2d5a3d] hover:underline font-medium">
                View all →
              </Link>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 flex-wrap mb-5">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-[#1a3a2a] text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1a3a2a]'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-[#1a3a2a] text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1a3a2a]'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(guide => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5 h-full cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[guide.category] ?? 'bg-gray-100 text-gr