'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export default function GuideDetail({ guide }) {
  const [checked, setChecked] = useState({})
  const [activeTab, setActiveTab] = useState('steps')
  const completedCount = Object.values(checked).filter(Boolean).length
  const totalSteps = guide.steps.length
  const pct = totalSteps ? Math.round((completedCount / totalSteps) * 100) : 0

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>
        <main>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, fontSize: '.82rem', color: '#6b7280', marginBottom: 20, flexWrap: 'wrap' }}>
            <Link href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/guides" style={{ color: '#6b7280', textDecoration: 'none' }}>{guide.categoryName}</Link>
            <span>/</span>
            <span style={{ color: '#1c2b20' }}>{guide.title}</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e8f4ec', color: '#2d6b42', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', padding: '4px 12px', borderRadius: 100, marginBottom: 14 }}>
              {guide.categoryIcon} {guide.categoryName}
            </div>
            <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.7rem,4vw,2.4rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.02em', marginBottom: 16 }}>{guide.title}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 20 }}>
              {[['⏱️', guide.time], ['💰', guide.cost], ['🟢', guide.difficulty], ['⭐', `${guide.rating} (${guide.ratingCount} ratings)`]].map(([icon, val]) => (
                <span key={val} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '.88rem', color: '#6b7280' }}><span>{icon}</span>{val}</span>
              ))}
            </div>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.75, borderLeft: '3px solid #3a8a55', paddingLeft: 16 }}>{guide.description}</p>
          </div>

          {/* Video */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#1a1a2e', borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
            <iframe src={`https://www.youtube.com/embed/${guide.videoId}`} title={guide.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
          </div>
          <p style={{ fontSize: '.78rem', color: '#6b7280', textAlign: 'right', marginBottom: 28 }}>
            Video by <a href="#" style={{ color: '#2d6b42', fontWeight: 600 }}>{guide.creatorName}</a> · {guide.creatorSubs} subscribers
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '2px solid #d1d5db', marginBottom: 28 }}>
            {['steps', 'tips', 'faq'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', fontSize: '.9rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'transparent', color: activeTab === tab ? '#2a5a3a' : '#6b7280', borderBottom: activeTab === tab ? '2px solid #2a5a3a' : '2px solid transparent', marginBottom: -2 }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Steps */}
          {activeTab === 'steps' && (
            <div>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, padding: '24px 0', borderBottom: i < guide.steps.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <button onClick={() => setChecked(prev => ({ ...prev, [i]: \!prev[i] }))} style={{ width: 36, height: 36, borderRadius: '50%', border: checked[i] ? 'none' : '2px solid #d1d5db', background: checked[i] ? '#2d6b42' : 'transparent', color: checked[i] ? '#fff' : 'transparent', cursor: 'pointer', fontSize: '.9rem', fontWeight: 700, transition: 'all .15s' }}>✓</button>
                    {i < guide.steps.length - 1 && <div style={{ width: 2, flex: 1, background: '#f3f4f6', margin: '4px 0' }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: checked[i] ? '#6b7280' : '#1c2b20', textDecoration: checked[i] ? 'line-through' : 'none' }}>{step.title}</h3>
                    <p style={{ fontSize: '.92rem', color: '#374151', lineHeight: 1.7 }}>{step.body}</p>
                    {step.tip && <div style={{ background: '#fef3d8', borderLeft: '3px solid #e8a838', borderRadius: '0 8px 8px 0', padding: '10px 14px', marginTop: 12, fontSize: '.85rem', color: '#7a5200' }}><strong>💡 Tip:</strong> {step.tip}</div>}
                    {step.warning && <div style={{ background: '#fef2f2', borderLeft: '3px solid #ef4444', borderRadius: '0 8px 8px 0', padding: '10px 14px', marginTop: 12, fontSize: '.85rem', color: '#7f1d1d' }}><strong>⚠️ Safety:</strong> {step.warning}</div>}
                  </div>
                </div>
              ))}
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
            <div style={{ fontSize: '.78rem', color: '#6b7280' }}>{completedCount} of {totalSteps} steps completed</div>
          </div>

          {/* Savings */}
          <div style={{ background: 'linear-gradient(135deg, #22472f, #1a3828)', color: '#fff', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.6)', marginBottom: 12 }}>💰 Your savings</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '.88rem' }}>
              <span style={{ color: 'rgba(255,255,255,.75)' }}>Contractor cost</span>
              <span style={{ fontWeight: 600 }}>${guide.savings + 15}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.88rem' }}>
              <span style={{ color: 'rgba(255,255,255,.75)' }}>Your parts cost</span>
              <span style={{ fontWeight: 600, color: 'rgba(255,255,255,.7)' }}>−$15</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.15)', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '.88rem' }}>You save</span>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', fontWeight: 800, color: '#e8a838' }}>${guide.savings}</span>
            </div>
          </div>

          {/* Materials */}
          {guide.materials.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid #d1d5db', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>Tools & Materials</div>
              {guide.materials.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < guide.materials.length - 1 ? '1px solid #f3f4f6' : 'none', fontSize: '.88rem' }}>
                  <span style={{ flex: 1, color: '#374151' }}>{m.name}</span>
                  {m.link && <a href={m.link} style={{ fontSize: '.75rem', color: '#2d6b42', fontWeight: 600, textDecoration: 'none' }}>{m.store} →</a>}
                </div>
              ))}
            </div>
          )}

          {/* Creator */}
          <div style={{ background: '#fff', border: '1px solid #d1d5db', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: '.85rem', fontWeight: 700, marginBottom: 14 }}>Guide creator</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#e8f4ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🔧</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{guide.creatorName}</div>
                <div style={{ fontSize: '.8rem', color: '#6b7280' }}>{guide.creatorSubs} subscribers</div>
              </div>
            </div>
            <a href="#" style={{ display: 'block', textAlign: 'center', padding: '9px', borderRadius: 8, fontSize: '.85rem', fontWeight: 600, border: '1px solid #2d6b42', color: '#2a5a3a', textDecoration: 'none' }}>Watch more on YouTube →</a>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  )
}
