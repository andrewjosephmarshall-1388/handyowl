import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GuideCard from '../components/GuideCard'
import { getFeaturedGuides } from '../lib/guides'

export default function HomePage() {
  const featured = getFeaturedGuides(4)

  return (
    <>
      <Navbar />

      {/* HERO */}
      <header style={{
        background: 'linear-gradient(160deg, #1a3828 0%, #2a5a3a 60%, #2d5a3a 100%)',
        color: '#fff', padding: '96px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 100, padding: '6px 14px', fontSize: '.8rem', fontWeight: 600, color: 'rgba(255,255,255,.9)', marginBottom: 28 }}>
            🦉 Trusted by homeowners across the US
          </div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 20 }}>
            Stop paying contractors for things{' '}
            <em style={{ fontStyle: 'italic', color: '#e8a838' }}>you can do yourself</em>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,.8)', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Handy Owl teaches homeowners maintenance, repairs, and upgrades through expert video guides, step-by-step checklists, and real cost breakdowns.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <Link href="/dashboard" style={{ background: '#e8a838', color: '#1c2b20', padding: '14px 28px', borderRadius: 10, fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}>
              Start for free
            </Link>
            <Link href="/guides" style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', color: '#fff', padding: '14px 28px', borderRadius: 10, fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}>
              Browse guides
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['$1,200+', 'Avg. annual savings'], ['200+', 'Expert guides'], ['50+', 'Creator partners']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', fontWeight: 800, color: '#e8a838' }}>{num}</div>
                <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.65)', fontWeight: 500, marginTop: 2, textTransform: 'uppercase', letterSpacing: '.05em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', background: '#e8f4ec', color: '#2d6b42', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', padding: '4px 12px', borderRadius: 100, marginBottom: 14 }}>How it works</span>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 16 }}>From "I have no idea" to project complete</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32, marginTop: 56 }}>
            {[
              { n: '1', title: 'Find your project', body: 'Browse 200+ guides by category, difficulty, time, and cost. Whether it\'s a leaky faucet or a full flooring install, we\'ve got it.' },
              { n: '2', title: 'Follow along with an expert', body: 'Watch a curated video from a trusted creator while following the interactive checklist. Pause, rewind, check off steps as you go.' },
              { n: '3', title: 'Save money, gain confidence', body: 'See exactly what it costs to hire out vs. DIY. Build real skills that pay off for years — every project makes the next one easier.' },
            ].map(step => (
              <div key={step.n}>
                <div style={{ width: 48, height: 48, background: '#2a5a3a', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, fontFamily: 'Fraunces, serif', marginBottom: 18 }}>{step.n}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: '.95rem', color: '#6b7280', lineHeight: 1.65 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED GUIDES */}
      <section style={{ padding: '80px 24px', background: '#faf9f6' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span style={{ display: 'inline-block', background: '#e8f4ec', color: '#2d6b42', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', padding: '4px 12px', borderRadius: 100, marginBottom: 10 }}>Popular guides</span>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.6rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-.02em' }}>Most-loved by homeowners</h2>
            </div>
            <Link href="/guides" style={{ fontSize: '.9rem', fontWeight: 600, color: '#2d6b42', textDecoration: 'none' }}>View all guides →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {featured.map(guide => <GuideCard key={guide.id} guide={guide} />)}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: '#e8f4ec', color: '#2d6b42', fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', padding: '4px 12px', borderRadius: 100, marginBottom: 14 }}>Simple pricing</span>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 16 }}>Start free. Upgrade when you're ready.</h2>
          <p style={{ fontSize: '1.05rem', color: '#6b7280', marginBottom: 48, lineHeight: 1.7 }}>One affordable Premium tier with everything included — video guides, checklists, cost calculators, and more.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, textAlign: 'left' }}>
            <PricingCard tier="Free" price="$0" desc="For homeowners just getting started" features={['2–3 new guides per week', 'Text + image guides', 'Browse full guide library', 'User ratings & reviews']} cta="Create free account" ctaStyle="outline" />
            <PricingCard tier="Premium" price="$7.99" desc="or $74/year — save $21" features={['Everything in Free', 'Unlimited guide access', 'Expert video walkthroughs (HD)', 'Interactive step checklists', 'Cost calculators & savings breakdowns', 'Printable materials lists', 'Early access to new guides', 'Ad-free experience']} cta="Get Premium" ctaStyle="filled" featured />
          </div>
          <p style={{ marginTop: 20, fontSize: '.85rem', color: '#6b7280' }}>7-day free trial included. Cancel anytime.</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(135deg, #22472f, #1a3828)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-.02em', color: '#fff', marginBottom: 16 }}>Your home. Your skills. Your savings.</h2>
          <p style={{ color: 'rgba(255,255,255,.7)', marginBottom: 40, fontSize: '1.05rem', lineHeight: 1.7 }}>Join thousands of homeowners tackling projects with confidence. Start free — no credit card required.</p>
          <Link href="/dashboard" style={{ background: '#e8a838', color: '#1c2b20', padding: '14px 32px', borderRadius: 10, fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}>
            Start for free →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

function PricingCard({ tier, price, desc, features, cta, ctaStyle, featured }) {
  return (
    <div style={{ border: featured ? '2px solid #2d6b42' : '2px solid #d1d5db', borderRadius: 16, padding: '32px 28px', position: 'relative', boxShadow: featured ? '0 0 0 4px rgba(45,107,66,.08), 0 12px 40px rgba(0,0,0,.12)' : 'none' }}>
      {featured && <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#2a5a3a', color: '#fff', fontSize: '.75rem', fontWeight: 700, padding: '4px 16px', borderRadius: 100, whiteSpace: 'nowrap' }}>MOST POPULAR</div>}
      <div style={{ fontSize: '.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#6b7280', marginBottom: 8 }}>{tier}</div>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: '3rem', fontWeight: 800, color: '#1c2b20', lineHeight: 1, marginBottom: 4 }}>{price}<span style={{ fontSize: '1rem', fontFamily: 'Inter, sans-serif', fontWeight: 500, color: '#6b7280' }}>/mo</span></div>
      <div style={{ fontSize: '.88rem', color: '#6b7280', margin: '8px 0 24px' }}>{desc}</div>
      <hr style={{ border: 'none', borderTop: '1px solid #d1d5db', margin: '0 0 20px' }} />
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {features.map(f => <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '.9rem', color: '#374151' }}><span style={{ color: '#2d6b42', fontWeight: 800, flexShrink: 0 }}>✓</span>{f}</li>)}
      </ul>
      <Link href="/pricing" style={{
        display: 'block', width: '100%', textAlign: 'center',
        padding: ctaStyle === 'filled' ? '14px' : '12px',
        borderRadius: 10, fontWeight: 700, fontSize: '.95rem',
        background: ctaStyle === 'filled' ? '#2a5a3a' : 'transparent',
        color: ctaStyle === 'filled' ? '#fff' : '#374151',
        border: ctaStyle === 'filled' ? 'none' : '2px solid #d1d5db',
        textDecoration: 'none',
      }}>{cta}</Link>
    </div>
  )
}
