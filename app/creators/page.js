import Link from 'next/link'

export const metadata = {
  title: 'Creator Partners — Handy Owl',
  description: 'Partner with Handy Owl to reach homeowners actively looking for your content.',
}

const benefits = [
  {
    icon: '📈',
    title: 'Drive real traffic',
    body: 'Your existing YouTube videos get embedded in guides searched by homeowners ready to act — not casual browsers.',
  },
  {
    icon: '💰',
    title: 'Revenue share',
    body: 'Earn a cut of Premium subscriptions attributed to your content. The better your guides perform, the more you earn.',
  },
  {
    icon: '🔗',
    title: 'Affiliate uplift',
    body: 'Your material recommendations show up in every guide you contribute. We handle the affiliate links; you get the commission.',
  },
  {
    icon: '📊',
    title: 'Analytics dashboard',
    body: 'See exactly how many homeowners watched your content, completed guides, and clicked your affiliate links.',
  },
  {
    icon: '🤝',
    title: 'No exclusivity',
    body: "Your content stays on YouTube. We embed it — you keep full ownership and can work with anyone else you want.",
  },
  {
    icon: '⚡',
    title: 'Quick onboarding',
    body: 'Submit your YouTube channel, pick your best guides, and go live in under a week. No new videos required.',
  },
]

const faqs = [
  {
    q: 'Do I need to create new videos?',
    a: 'No. We embed your existing YouTube content. If you have videos that already teach home repair skills, you qualify.',
  },
  {
    q: 'What size channel do I need?',
    a: "We work with creators from 10K subscribers up. Quality and niche matter more than raw numbers — a focused plumbing channel at 25K subs is a great fit.",
  },
  {
    q: 'How does revenue share work?',
    a: 'When a user upgrades to Premium after engaging with your content, you earn a percentage of their first year of revenue. Exact rates are set in your creator agreement.',
  },
  {
    q: 'Can I remove my content later?',
    a: 'Yes. 30-day notice and we remove your embeds. No penalties.',
  },
]

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#1a3a2a] text-white py-24 px-4 text-center">
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">For Creators</p>
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Your videos, working harder for you
        </h1>
        <p className="text-lg text-white/70 max-w-xl mx-auto mb-8">
          Partner with Handy Owl to reach homeowners at the exact moment they need your expertise — and earn revenue share on every Premium subscriber you bring in.
        </p>
        <a
          href="#apply"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
        >
          Apply to Partner →
        </a>
      </section>

      {/* Numbers */}
      <section className="border-b border-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: '50K+', label: 'Monthly active homeowners' },
            { value: '200+', label: 'Guides on the platform' },
            { value: '$847', label: 'Avg. user savings tracked' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-[#1a3a2a]" style={{ fontFamily: 'Fraunces, serif' }}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-bold text-[#1a3a2a] text-center mb-12"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Why creators partner with us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map(b => (
              <div key={b.title} className="p-6 rounded-2xl border border-gray-100 hover:border-[#1a3a2a]/20 hover:shadow-sm transition-all">
                <p className="text-3xl mb-4">{b.icon}</p>
                <h3 className="font-bold text-[#1a3a2a] mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1a3a2a] mb-12" style={{ fontFamily: 'Fraunces, serif' }}>
            How it works
          </h2>
          <div className="space-y-8 text-left">
            {[
              { step: '01', title: 'Apply', body: 'Fill out the form below with your channel link and niche. We review within 3 business days.' },
              { step: '02', title: 'Onboard', body: "We map your best videos to our guide categories, write the surrounding content, and build the interactive checklist around your walkthrough." },
              { step: '03', title: 'Go live', body: "Your content is live on Handy Owl. You start earning traffic and revenue share immediately — no maintenance needed from you." },
            ].map(s => (
              <div key={s.step} className="flex gap-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <span className="text-3xl font-bold text-amber-500 shrink-0" style={{ fontFamily: 'Fraunces, serif' }}>
                  {s.step}
                </span>
                <div>
                  <h3 className="font-bold text-[#1a3a2a] mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1a3a2a] text-center mb-8" style={{ fontFamily: 'Fraunces, serif' }}>
          Questions
        </h2>
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.q} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-[#1a3a2a] mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="bg-[#1a3a2a] py-20 px-4">
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl font-bold text-white text-center mb-2"
            style={{ fontFamily: 'Fraunces, serif' }}
          >
            Apply to partner
          </h2>
          <p className="text-white/60 text-center mb-8 text-sm">We review every application personally within 3 business days.</p>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">First name</label>
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Last name</label>
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
              <input
                type="email"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">YouTube channel URL</label>
              <input
                type="url"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="https://youtube.com/@yourchannel"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Approx. subscribers</label>
              <select className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="" className="text-gray-900">Select range</option>
                <option value="10k-50k" className="text-gray-900">10K – 50K</option>
                <option value="50k-200k" className="text-gray-900">50K – 200K</option>
                <option value="200k-500k" className="text-gray-900">200K – 500K</option>
                <option value="500k+" className="text-gray-900">500K+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Primary niche</label>
              <input
                type="text"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g. Plumbing, Electrical, General DIY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Anything else? (optional)</label>
              <textarea
                rows={3}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                placeholder="Tell us about your content and audience..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
