import Link from 'next/link'
import { OwlLogo } from './Navbar'

export default function Footer() {
  return (
    <footer style={{ background: '#1a3828', color: 'rgba(255,255,255,.6)', padding: '48px 24px 32px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.1rem', color: '#fff', textDecoration: 'none', marginBottom: 12 }}>
              <OwlLogo size={28} /> Handy Owl
            </Link>
            <p style={{ fontSize: '.88rem', lineHeight: 1.7, maxWidth: 260 }}>Expert DIY home guides for real homeowners. Learn once, save forever.</p>
          </div>
          <FooterCol title="Guides" links={[['Plumbing', '/guides?cat=plumbing'], ['HVAC', '/guides?cat=hvac'], ['Electrical', '/guides?cat=electrical'], ['Flooring', '/guides?cat=flooring']]} />
          <FooterCol title="Company" links={[['About', '/about'], ['Creator partners', '/creators'], ['Blog', '/blog'], ['Careers', '/careers']]} />
          <FooterCol title="Support" links={[['FAQ', '/faq'], ['Contact', '/contact'], ['Privacy policy', '/privacy'], ['Terms of service', '/terms']]} />
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', flexWrap: 'wrap', gap: 12 }}>
          <span>© {new Date().getFullYear()} Handy Owl. All rights reserved.</span>
          <span>handyowl.net</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 style={{ fontSize: '.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'rgba(255,255,255,.9)', marginBottom: 14 }}>{title}</h4>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {links.map(([label, href]) => (
          <li key={label}><Link href={href} style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.6)', textDecoration: 'none' }}>{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}
