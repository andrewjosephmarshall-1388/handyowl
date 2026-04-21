'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function OwlLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#1a3a2a"/>
      <ellipse cx="12" cy="15" rx="3" ry="3.5" fill="white"/>
      <ellipse cx="20" cy="15" rx="3" ry="3.5" fill="white"/>
      <circle cx="12" cy="15" r="1.5" fill="#1a3a2a"/>
      <circle cx="20" cy="15" r="1.5" fill="#1a3a2a"/>
      <path d="M14 20 Q16 22 18 20" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M10 10 L12 13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 10 L20 13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

const navLinks = [
  { href: '/guides', label: 'Guides' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/creators', label: 'For Creators' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#1a3a2a]">
          <OwlLogo />
          <span style={{ fontFamily: 'Fraunces, serif' }}>Handy Owl</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-[#1a3a2a]'
                  : 'text-gray-500 hover:text-[#1a3a2a]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-[#1a3a2a] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="bg-[#1a3a2a] hover:bg-[#2d5a3d] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1">
            <span className={`block h-0.5 bg-gray-600 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-gray-600 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-gray-600 transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-gray-700 hover:text-[#1a3a2a] py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link href="/login" className="block text-center border border-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium">
              Sign in
            </Link>
            <Link href="/login" className="block text-center bg-[#1a3a2a] text-white py-2 rounded-lg text-sm font-semibold">
              Get started free
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
