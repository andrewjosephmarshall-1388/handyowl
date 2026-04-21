import { NextResponse } from 'next/server'
import { guides, getGuidesByCategory } from '@/lib/guides'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const q = searchParams.get('q')?.toLowerCase()

  let results = category ? getGuidesByCategory(category) : guides

  if (q) {
    results = results.filter(
      g =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    )
  }

  return NextResponse.json({ guides: results, total: results.length })
}
