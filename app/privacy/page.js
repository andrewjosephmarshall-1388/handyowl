export const metadata = { title: 'Privacy Policy — Handy Owl' }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1a3a2a] mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: April 2026</p>

      <div className="space-y-8 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">What we collect</h2>
          <p>We collect your name and email when you create an account, and payment info is handled entirely by Stripe — we never store your card number. We also collect usage data (guides viewed, steps completed) to improve the product.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">How we use it</h2>
          <p>We use your data to operate the Service, send transactional emails (receipts, account notices), and improve our guides. We do not sell your personal data to third parties.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">Cookies</h2>
          <p>We use session cookies for authentication and small analytics cookies to understand how people use the site. You can disable cookies in your browser, but some features may not work.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">Third-party services</h2>
          <p>We use Stripe for payments, Google for OAuth sign-in, and YouTube for embedded video content. Each of these services has its own privacy policy.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">Your rights</h2>
          <p>You can request access to, correction of, or deletion of your personal data at any time by emailing <a href="mailto:hello@handyowl.net" className="text-[#2d5a3d] underline">hello@handyowl.net</a>.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">Contact</h2>
          <p>Privacy questions: <a href="mailto:hello@handyowl.net" className="text-[#2d5a3d] underline">hello@handyowl.net</a></p>
        </section>
      </div>
    </div>
  )
}
