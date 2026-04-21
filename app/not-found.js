import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl mb-4">🦉</p>
        <h1 className="text-4xl font-bold text-[#1a3a2a] mb-3" style={{ fontFamily: 'Fraunces, serif' }}>
          404 — Page not found
        </h1>
        <p className="text-gray-500 mb-8">This page flew away. Let's get you back on track.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="bg-[#1a3a2a] hover:bg-[#2d5a3d] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            Go home
          </Link>
          <Link href="/guides" className="border border-gray-200 text-gray-700 hover:border-[#1a3a2a] px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
            Browse guides
          </Link>
        </div>
      </div>
    </div>
  )
}
