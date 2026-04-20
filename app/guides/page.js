import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import GuideCard from '../../components/GuideCard'
import { guides, categories } from '../../lib/guides'

export const metadata = { title: 'All Guides — Handy Owl' }

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <div style={{ background: '#1a3828', color: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 8 }}>All Guides</h1>
          <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '1.05rem' }}>{guides.length} expert guides — new ones added every week</p>
        </div>
      </div>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 24px' }}>
        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          <div style={{ padding: '6px 16px', borderRadius: 100, fontWeight: 600, fontSize: '.85rem', background: '#2a5a3a', color: '#fff', border: '1px solid #2a5a3a', cursor: 'pointer' }}>All</div>
          {categories.map(cat => (
            <div key={cat.id} style={{ padding: '6px 16px', borderRadius: 100, fontWeight: 600, fontSize: '.85rem', background: '#fff', color: '#374151', border: '1px solid #d1d5db', cursor: 'pointer' }}>{cat.icon} {cat.name}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {guides.map(guide => <GuideCard key={guide.id} guide={guide} />)}
        </div>
      </div>
      <Footer />
    </>
  )
}
