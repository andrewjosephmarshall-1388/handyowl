import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import PremiumPricingCTA from '@/components/PremiumPricingCTA'

export const metadata = {
  title: 'Pricing — Handy Owl',
  description: 'One simple plan. Unlimited access to every guide, cost tool, and expert tip.',
}

const freeFeatures = [
  '10 free guides per month',
  'Basic step-by-step instructions',
  'Community Q&A access',
  'Cost estimator (3 uses/mo)',
]

const premiumFeatures = [
  'Unlimited access to 200+ guides',
  'Interactive step checklists',
  'Full cost & savings calculator',
  'Material lists with best-price links',
  'Expert video walkthroughs',
  'Download guides for offline use',
  'Priority support',
  'New guides every week',
]

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account settings at any time — no questions asked. You keep access until the end of your billing period.',
  },
  {
    q: 'Is there a free trial?',
    a: "You start on the free plan automatically. Upgrade when you're ready — no credit card required to browse.",
  },
  {
    q: "What's included in the free plan?",
    a: 'The free plan gives you access to 10 guides per month, basic instructions, and limited use of the cost estimator.',
  },
  {
    q: 'Do you offer refunds?',
    a: "If you're not happy within the first 30 days, contact us and we'll refund you in full.",
  },
  {
    q: 'Can I use Handy Owl on my phone?',
    a: 'Absolutely. Handy Owl works on any device. Premium members can also download guides for offline use.',
  },
  {
    q: 'How does billing work?',
    a: 'We use Stripe for all payments. Your card is charged monthly or annually depending on the plan you choose. You can manage or cancel anytime from your account settings.',
  },
  {
    q: 'Can I switch between monthly and yearly?',
    a: 'Yes. Click "Manage subscription" and choose the plan you want. Stripe prorates the switch automatically — no double-billing.',
  },
]

export default async function PricingPage() {
  const session = await getServerSession(authOptions)
  const isAuthed = !!session?.user
  const isPremium = session?.user?.plan === 'PREMIUM'

  const mode = isPremium ? 'premium' : isAuthed ? 'authed' : 'anon'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#1a3a2a] text-white py-20 px-4 text-center">
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">Simple Pricing</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
          One plan. Every guide.
        </h1>
        <p className="text-lg text-white/70 max-w-xl mx-auto">
          Stop paying contractors for jobs you can do yourself. Handy Owl pays for itself the first time you use it.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Free</h2>
              <p className="text-gray-500 text-sm">Try before you commit</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-400 ml-1">/ forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              {freeFeatures.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-gray-400 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            {isAuthed ? (
              <Link
                href="/dashboard"
                className="block text-center border border-gray-300 hover:border-[#1a3a2a] text-gray-700 hover:text-[#1a3a2a] py-3 rounded-xl font-semibold transition-colors"
              >
                Go to dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="block text-center border border-gray-300 hover:border-[#1a3a2a] text-gray-700 hover:text-[#1a3a2a] py-3 rounded-xl font-semibold transition-colors"
              >
                Get started free
              </Link>
            )}
          </div>

          {/* Premium */}
          <div className="bg-[#1a3a2a] rounded-2xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {isPremium ? 'YOUR PLAN' : 'MOST POPULAR'}
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Premium</h2>
              <p className="text-white/60 text-sm">Everything you need to own your home</p>
            </div>

            {/* Toggle + price + features + CTA are all managed by the client component */}
            <PremiumPricingCTA mode={mode} features={premiumFeatures} />
          </div>
        </div>

        {/* Value prop */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <p className="text-lg font-bold text-[#1a3a2a] mb-1">💡 The math is simple</p>
          <p className="text-gray-600 text-sm max-w-lg mx-auto">
            The average plumber charges <strong>$150–$300</strong> for a simple faucet repair. Handy Owl Premium costs <strong>$7.99/month</strong>. Fix one thing yourself and you've paid for a whole year.
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">🔒 Secured by Stripe</span>
          <span className="flex items-center gap-1.5">↩️ 30-day refund guarantee</span>
          <span className="flex items-center gap-1.5">❌ Cancel anytime</span>
          <span className="flex items-center gap-1.5">📱 Works on all devices</span>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-[#1a3a2a] text-center mb-8" style={{ fontFamily: 'Fraunces, serif' }}>
          Common questions
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
    </div>
  )
}
