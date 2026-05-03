'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { categories } from '@/lib/guides'

// Quick lookup for category metadata by slug.
const CATEGORY_LOOKUP = Object.fromEntries(categories.map(c => [c.id, c]))

/**
 * Extract a YouTube video ID from a URL string. Returns null if the URL isn't
 * a recognizable YouTube video link. Supports:
 *   - https://www.youtube.com/watch?v=ABC123
 *   - https://youtu.be/ABC123
 *   - https://www.youtube.com/embed/ABC123
 */
function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null
    if (u.hostname.endsWith('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return v
      const m = u.pathname.match(/^\/embed\/([^/]+)/)
      if (m) return m[1]
    }
  } catch {
    return null
  }
  return null
}

// Save progress to /api/guides/progress after a brief idle period so we don't
// hammer the DB on every click.
const SAVE_DEBOUNCE_MS = 500

export default function GuideDetail({ guide }) {
  const { data: session, status } = useSession()
  const isAuthed = status === 'authenticated'

  const category = CATEGORY_LOOKUP[guide.category] ?? { name: guide.category, icon: '🔧' }
  // Two-field model: videoUrl is the specific video to embed; channelUrl is
  // the creator's channel (used for "Watch more" + attribution links). Falls
  // back to legacy `creator.youtube` for guides that haven't been migrated.
  const creatorVideoUrl = guide.creator?.videoUrl ?? guide.creator?.youtube
  const creatorChannelUrl = guide.creator?.channelUrl ?? guide.creator?.youtube
  const videoId = extractYouTubeId(creatorVideoUrl)

  const totalSteps = guide.steps?.length ?? 0
  const savings = Math.max(0, (guide.contractorCost ?? 0) - (guide.diyCost ?? 0))

  // checked[index] = true means that step is complete.
  const [checked, setChecked] = useState({})
  const [activeTab, setActiveTab] = useState('steps')
  const [syncing, setSyncing] = useState(false)
  const saveTimerRef = useRef(null)
  const hasLoadedRef = useRef(false)

  const completedCount = Object.values(checked).filter(Boolean).length
  const pct = totalSteps ? Math.round((completedCount / totalSteps) * 100) : 0

  // On mount, if the user is signed in, load any prior progress from the DB.
  useEffect(() => {
    if (!isAuthed || hasLoadedRef.current) return
    hasLoadedRef.current = true
    ;(async () => {
      try {
        const res = await fetch(`/api/guides/progress?slug=${encodeURIComponent(guide.slug)}`)
        if (!res.ok) return
        const data = await res.json()
        // The server returns a step-index array of completed steps. Rehydrate checked map.
        if (Array.isArray(data?.completedSteps)) {
          const rehydrated = {}
          for (const i of data.completedSteps) rehydrated[i] = true
          setChecked(rehydrated)
        }
      } catch {
        // Network error or unauthenticated — either way, don't block the page.
      }
    })()
  }, [isAuthed, guide.slug])

  // Whenever checked changes (and the user is authed), schedule a save.
  useEffect(() => {
    if (!isAuthed) return
    if (!hasLoadedRef.current) return // don't save before we've loaded initial state

    clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(async () => {
      setSyncing(true)
      try {
        const completedSteps = Object.entries(checked)
          .filter(([, v]) => v)
          .map(([k]) => Number(k))
        await fetch('/api/guides/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: guide.slug,
            completedSteps,
            totalSteps,
          }),
        })
      } catch {
        // silently ignore; next change will retry
      } finally {
        setSyncing(false)
      }
    }, SAVE_DEBOUNCE_MS)

    return () => clearTimeout(saveTimerRef.current)
  }, [checked, isAuthed, guide.slug, totalSteps])

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '32px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 40,
        alignItems: 'start',
      }}
    >
      <main>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, fontSize: '.82rem', color: '#6b7280', marginBottom: 20, flexWrap: 'wrap' }}>
          <Link href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>
            Home
          </Link>
          <span>/</span>
          <Link href="/guides" style={{ color: '#6b7280', textDecoration: 'none' }}>
            {category.name}
          </Link>
          <span>/</span>
          <span style={{ color: '#1c2b20' }}>{guide.title}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#e8f4ec',
              color: '#2d6b42',
              fontSize: '.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.08em',
              padding: '4px 12px',
              borderRadius: 100,
              marginBottom: 14,
            }}
          >
            {category.icon} {category.name}
            {guide.premium && <span style={{ marginLeft: 8 }}>· ⭐ Premium</span>}
          </div>
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(1.7rem,4vw,2.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-.02em',
              marginBottom: 16,
            }}
          >
            {guide.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 20 }}>
            {[
              ['⏱️', guide.duration],
              ['💰', guide.cost],
              ['🟢', guide.difficulty],
              ['⭐', `${guide.rating} (${guide.reviews} reviews)`],
            ].map(([icon, val]) => (
              <span
                key={String(val)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.88rem', color: '#6b7280' }}
              >
                <span>{icon}</span>
                {val}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.75, borderLeft: '3px solid #3a8a55', paddingLeft: 16 }}>
            {guide.description}
          </p>
        </div>

        {/* Video (only when we actually have one to embed) */}
        {videoId && (
          <>
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                background: '#1a1a2e',
                borderRadius: 12,
                overflow: 'hidden',
                marginBottom: 8,
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={guide.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 8 }}>
              <p style={{ fontSize: '.78rem', color: '#6b7280', margin: 0 }}>
                Video by{' '}
                <a
                  href={creatorChannelUrl ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2d6b42', fontWeight: 600 }}
                >
                  {guide.creator?.name ?? 'Creator'}
                </a>{' '}
                · {guide.creator?.subscribers ?? '—'} subscribers
              </p>
              <a
                href={`mailto:hello@handyowl.net?subject=${encodeURIComponent('Video removal request — ' + guide.title)}&body=${encodeURIComponent(`Hi Handy Owl,\n\nI'm the creator of the video featured on your "${guide.title}" guide (${creatorVideoUrl ?? ''}). Please remove it from your site.\n\nThanks,`)}`}
                style={{ fontSize: '.7rem', color: '#9ca3af', textDecoration: 'underline' }}
              >
                Request removal
              </a>
            </div>
          </>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid #d1d5db', marginBottom: 28 }}>
          {['steps', 'tips', 'faq'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                fontSize: '.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                color: activeTab === tab ? '#2a5a3a' : '#6b7280',
                borderBottom: activeTab === tab ? '2px solid #2a5a3a' : '2px solid transparent',
                marginBottom: -2,
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Steps */}
        {activeTab === 'steps' && (
          <div>
            {guide.steps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 20,
                  padding: '24px 0',
                  borderBottom: i < guide.steps.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <button
                    onClick={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                    aria-label={checked[i] ? `Mark step ${i + 1} incomplete` : `Mark step ${i + 1} complete`}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      border: checked[i] ? 'none' : '2px solid #d1d5db',
                      background: checked[i] ? '#2d6b42' : 'transparent',
                      color: checked[i] ? '#fff' : 'transparent',
                      cursor: 'pointer',
                      fontSize: '.9rem',
                      fontWeight: 700,
                      transition: 'all .15s',
                    }}
                  >
                    ✓
                  </button>
                  {i < guide.steps.length - 1 && <div style={{ width: 2, flex: 1, background: '#f3f4f6', margin: '4px 0' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      marginBottom: 8,
                      color: checked[i] ? '#6b7280' : '#1c2b20',
                      textDecoration: checked[i] ? 'line-through' : 'none',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '.92rem', color: '#374151', lineHeight: 1.7 }}>{step.body}</p>
                </div>
              </div>
            ))}
            {isAuthed && (
              <p style={{ fontSize: '.75rem', color: '#9ca3af', textAlign: 'right', marginTop: 12 }}>
                {syncing ? 'Saving your progress…' : completedCount > 0 ? 'Progress saved' : ''}
              </p>
            )}
            {!isAuthed && (
              <p style={{ fontSize: '.82rem', color: '#6b7280', textAlign: 'center', marginTop: 20, padding: 14, background: '#f9fafb', borderRadius: 8 }}>
                <Link href="/login" style={{ color: '#2d6b42', fontWeight: 600 }}>Sign in</Link>{' '}
                to save your progress across visits.
              </p>
            )}
          </div>
        )}

        {activeTab === 'tips' && <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Pro tips coming soon for this guide.</p>}
        {activeTab === 'faq' && <p style={{ color: '#6b7280', fontStyle: 'italic' }}>FAQ coming soon for this guide.</p>}
      </main>

      {/* Sidebar */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 84 }}>
        {/* Progress */}
        <div style={{ background: '#fff', border: '1px solid #d1d5db', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: '.85rem', fontWeight: 700, marginBottom: 12 }}>Your progress</div>
          <div style={{ background: '#f3f4f6', borderRadius: 100, height: 8, marginBottom: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#2d6b42', borderRadius: 100, width: `${pct}%`, transition: 'width .4s' }} />
          </div>
          <div style={{ fontSize: '.78rem', color: '#6b7280' }}>
            {completedCount} of {totalSteps} steps completed
          </div>
        </div>

        {/* Savings */}
        {savings > 0 && (
          <div style={{ background: 'linear-gradient(135deg, #22472f, #1a3828)', color: '#fff', borderRadius: 12, padding: 20 }}>
            <div
              style={{
                fontSize: '.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                color: 'rgba(255,255,255,.6)',
                marginBottom: 12,
              }}
            >
              💰 Your savings
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '.88rem' }}>
              <span style={{ color: 'rgba(255,255,255,.75)' }}>Contractor cost</span>
              <span style={{ fontWeight: 600 }}>${guide.contractorCost}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.88rem' }}>
              <span style={{ color: 'rgba(255,255,255,.75)' }}>Your parts cost</span>
              <span style={{ fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>−${guide.diyCost}</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.15)', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '.88rem' }}>You save</span>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', fontWeight: 800, color: '#e8a838' }}>
                ${savings}
              </span>
            </div>
          </div>
        )}

        {/* Materials */}
        {guide.materials && guide.materials.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid #d1d5db', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>Tools & Materials</div>
            {guide.materials.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 0',
                  borderBottom: i < guide.materials.length - 1 ? '1px solid #f3f4f6' : 'none',
                  fontSize: '.88rem',
                }}
              >
                <span style={{ flex: 1, color: '#374151' }}>{m.name}</span>
                <span style={{ fontSize: '.78rem', color: '#6b7280' }}>{m.price}</span>
              </div>
            ))}
            {guide.materials.some(m => m.affiliate) && (
              <p style={{ fontSize: '.7rem', color: '#9ca3af', marginTop: 10 }}>Links may be affiliate; we may earn a small commission.</p>
            )}
          </div>
        )}

        {/* Creator */}
        {guide.creator?.name && (
          <div style={{ background: '#fff', border: '1px solid #d1d5db', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>Guide creator</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#e8f4ec',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                }}
              >
                🔧
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{guide.creator.name}</div>
                <div style={{ fontSize: '.8rem', color: '#6b7280' }}>{guide.creator.subscribers} subscribers</div>
              </div>
            </div>
            {creatorChannelUrl && (
              <a
                href={creatorChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '9px',
                  borderRadius: 8,
                  fontSize: '.85rem',
                  fontWeight: 600,
                  border: '1px solid #2d6b42',
                  color: '#2a5a3a',
                  textDecoration: 'none',
                }}
              >
                Watch more on YouTube →
              </a>
            )}
          </div>
        )}
      </aside>
    </div>
  )
}
