'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar({ variant = 'light' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(250,249,246,.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,0,0,.06)',
    }}>
      <div style={{
        maxWidth: 1120, margin: '0 auto',
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.1rem', color: '#22472f', textDecoration: 'none' }}>
          <OwlLogo />
          Handy Owl
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link href="/guides" style={{ fontSize: '.9rem', fontWeight: 500, color: '#374151', textDecoration: 'none' }}>Guides</Link>
          <Link href="/#features" style={{ fontSize: '.9rem', fontWeight: 500, color: '#374151', textDecoration: 'none' }}>Features</Link>
          <Link href="/pricing" style={{ fontSize: '.9rem', fontWeight: 500, color: '#374151', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/dashboard" style={{
            background: '#2a5a3a', color: '#fff',
            padding: '8px 20px', borderRadius: 8,
            fontSize: '.9rem', fontWeight: 600,
            textDecoration: 'none',
          }}>Get started free</Link>
        </div>
      </div>
    </nav>
  )
}

export function OwlLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="18" cy="18" r="18" fill="#2d6b42"/>
      <ellipse cx="18" cy="21" rx="9" ry="10" fill="#e8a838"/>
      <ellipse cx="18" cy="13" rx="8" ry="7" fill="#e8a838"/>
      <polygon points="12,8 14,4 16,8" fill="#2d6b42"/>
      <polygon points="20,8 22,4 24,8" fill="#2d6b42"/>
      <circle cx="14.5" cy="13" r="3.5" fill="#fff"/>
      <circle cx="14.5" cy="13" r="2" fill="#1c2b20"/>
      <circle cx="15.2" cy="12.3" r=".6" fill="#fff"/>
      <circle cx="21.5" cy="13" r="3.5" fill="#fff"/>
      <circle cx="21.5" cy="13" r="2" fill="#1c2b20"/>
      <circle cx="22.2" cy="12.3" r=".6" fill="#fff"/>
      <polygon points="17,15 19,15 18,17" fill="#c98a1a"/>
    </svg>
  )
}
