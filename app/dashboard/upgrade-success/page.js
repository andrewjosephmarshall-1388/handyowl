import Link from 'next/link'

export const metadata = { title: "Welcome to Premium — Handy Owl" }

export default function UpgradeSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1
          className="text-3xl font-bold text-[#1a3a2a] mb-3"
          style={{ fontFamily: 'Fraunces, serif' }}
        >
          Welcome to Premium!
        </h1>
        <p className="text-gray-600 mb-8">
          You now have unlimited access to every guide, cost tool, and expert video on Handy Owl. Time to start saving money.
        </p>
        <div className="space-y-3">
          <Link
            href="/guides"
            className="block bg-[#1a3a2a] hover:bg-[#2d5a3d] text-white py-3 rounded-xl font-bold transition-colors"
          >
            Browse all guides →
          </Link>
          <Link
            href="/dashboard"
            className="block border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:border-[#1a3a2a] transition-colors"
          >
            Go to my dashboard
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-6">
          A receipt has been sent to your email. Manage your subscription anytime in{' '}
          <Link href="/dashboard/settings" className="underline">Account Settings</Link>.
        </p>
      </div>
    </div>
  )
}
