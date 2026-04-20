import { notFound } from 'next/navigation'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { getGuideBySlug, guides } from '../../../lib/guides'
import GuideDetail from './GuideDetail'

export async function generateStaticParams() {
  return guides.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }) {
  const guide = getGuideBySlug(params.slug)
  if (\!guide) return {}
  return {
    title: `${guide.title} — Handy Owl`,
    description: guide.description,
  }
}

export default function GuidePage({ params }) {
  const guide = getGuideBySlug(params.slug)
  if (\!guide) notFound()
  return <GuideDetail guide={guide} />
}
