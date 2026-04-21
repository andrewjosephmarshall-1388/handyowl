'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { guides } from '@/lib/guides'

export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const ref = useRef(null)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    const q = query.toLowerCase()
    const matched = guides.filter(
      g =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    ).slice(0, 5)
    setResults(matched)
    setOpen(true)
  }, [query])

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(slug) {
    setQuery('')
    setOpen(false)
    router.push(`/guides/${slug}`)
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search guides… (e.g. leaky faucet)"
          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:border-transparent text-sm"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
          {results.map(guide => (
            <button
              key={guide.slug}
              onClick={() => handleSelect(guide.slug)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1a3a2a] truncate">{guide.title}</p>
                <p className="text-xs text-gray-400 capitalize">{guide.category} · {guide.duration}</p>
              </div>
              {guide.premium && (
                <span className="text-xs text-amber-600 font-semibold shrink-0">⭐ Premium</span>
              )}
            </button>
          ))}
          <div className="px-4 py-2 border-t border-gray-100">
            <button
              onClick={() => { router.push(`/guides?q=${query}`); setOpen(false) }}
              className="text-xs text-[#2d5a3d] font-medium hover:underline"
            >
              See all results for "{query}" →
            </button>
          </div>
        </div>
      )}

      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg z-50 px-4 py-3">
          <p className="text-sm text-gray-500">No guides found for "{query}"</p>
        </div>
      )}
    </div>
  )
}
