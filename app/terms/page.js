export const metadata = { title: 'Terms of Service — Handy Owl' }

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1a3a2a] mb-2" style={{ fontFamily: 'Fraunces, serif' }}>
        Terms of Service
      </h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: April 2026</p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using Handy Owl ("the Service"), you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">2. Description of Service</h2>
          <p>Handy Owl provides homeowners with educational DIY guides, video content, and tools to assist with home maintenance and repair. The Service is offered on a freemium basis with an optional paid Premium tier.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">3. Safety Disclaimer</h2>
          <p>Handy Owl guides are for educational purposes only. Always follow local building codes, turn off power before electrical work, and consult a licensed professional for any project beyond your skill level. Handy Owl is not liable for injury, property damage, or losses resulting from use of our content.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">4. Subscriptions and Billing</h2>
          <p>Premium subscriptions are billed monthly or annually via Stripe. Subscriptions renew automatically. You may cancel at any time; cancellation takes effect at the end of the current billing period. We offer a 30-day money-back guarantee on first-time purchases.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">5. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">6. Intellectual Property</h2>
          <p>All content on Handy Owl — including text, graphics, and UI — is owned by Handy Owl or its content partners. Embedded videos remain the property of their respective creators. You may not reproduce or redistribute our content without written permission.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">7. Affiliate Links</h2>
          <p>Material recommendations in guides may include affiliate links. We may earn a commission on purchases made through these links at no extra cost to you. We only recommend products we believe are useful.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">8. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-[#1a3a2a] mb-2">9. Contact</h2>
          <p>Questions? Email us at <a href="mailto:hello@handyowl.net" className="text-[#2d5a3d] underline">hello@handyowl.net</a>.</p>
        </section>
      </div>
    </div>
  )
}
