'use client'

import Link from 'next/link'

export default function GuideCard({ guide }) {
  const bgMap = {
    plumbing: '#e8f4ec', hvac: '#fef3d8', electrical: '#fef2f2',
    flooring: '#f5f0ff', doors: '#e8f4ec', kitchen: '#fef9ec',
    bathroom: '#e8f4f9', outdoor: '#f0f4ec',
  }

  return (
    <Link href={`/guides/${guide.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff', border: '1px solid #d1d5db',
        borderRadius: 12, overflow: 'hidden',
        transition: 'border-color .15s, box-shadow .15s, transform .15s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#3a8a55'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.1)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <div style={{
          height: 110, background: bgMap[guide.category] || '#f3f4f6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.4rem',
        }}>
          {guide.categoryIcon}
        </div>
        <div style={{ padding: '14px 16px 16px' }}>
          {guide.premium && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: '#fef3d8', color: '#c98a1a',
              fontSize: '.68rem', fontWeight: 700,
              padding: '2px 8px', borderRadius: 100,
              marginBottom: 6,
            }}>⭐ Premium</div>
          )}
          <div style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: '#2d6b42', marginBottom: 4 }}>
            {guide.categoryName}
          </div>
          <div style={{ fontSize: '.92rem', fontWeight: 700, color: '#1c2b20', marginBottom: 10, lineHeight: 1.35 }}>
            {guide.title}
          </div>
          <div style={{ display: 'flex', gap: 10, fontSize: '.75rem', color: '#6b7280' }}>
            <span>⏱ {guide.time}</span>
            <span>💰 {guide.cost}</span>
            <span>{guide.difficulty === 'Beginner' ? '🟢' : guide.difficulty === 'Intermediate' ? '🟡' : '🔴'} {guide.difficulty}</span>
          </div>
        </div>
      </div>
    