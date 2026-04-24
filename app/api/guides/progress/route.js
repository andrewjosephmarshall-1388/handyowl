import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { guides } from '@/lib/guides'

// Endpoints for per-user guide progress.
//
// GET  /api/guides/progress?slug=<guide-slug>      -> { completedSteps: number[] }
// POST /api/guides/progress                        -> upsert progress for a guide
//        body: { slug, completedSteps: number[], totalSteps: number }
//
// Progress storage uses the GuideProgress table. We store the number of steps
// completed as a scalar, plus the list of completed step indices encoded as
// a simple CSV for now (future: migrate to a JSON column or separate join
// table if we need richer per-step metadata).

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const progress = await prisma.guideProgress.findUnique({
    where: {
      userId_guideSlug: {
        userId: session.user.id,
        guideSlug: slug,
      },
    },
  })

  return NextResponse.json({
    completedSteps: decodeSteps(progress?.completedStepsCsv),
    stepsComplete: progress?.stepsComplete ?? 0,
    totalSteps: progress?.totalSteps ?? 0,
    completed: progress?.completed ?? false,
  })
}

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const slug = typeof body?.slug === 'string' ? body.slug : null
  const incomingSteps = Array.isArray(body?.completedSteps) ? body.completedSteps : []
  const declaredTotal = Number.isFinite(body?.totalSteps) ? Number(body.totalSteps) : 0

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  // Validate the slug against the guides catalog so we never write progress
  // rows for made-up slugs.
  const guide = guides.find(g => g.slug === slug)
  if (!guide) {
    return NextResponse.json({ error: 'Unknown guide' }, { status: 404 })
  }

  const totalSteps = guide.steps?.length ?? declaredTotal
  // Sanitize step indices: must be integers within [0, totalSteps).
  const completedSet = new Set()
  for (const raw of incomingSteps) {
    const n = Number(raw)
    if (Number.isInteger(n) && n >= 0 && n < totalSteps) completedSet.add(n)
  }
  const completedSteps = Array.from(completedSet).sort((a, b) => a - b)
  const stepsComplete = completedSteps.length
  const completed = totalSteps > 0 && stepsComplete === totalSteps

  await prisma.guideProgress.upsert({
    where: {
      userId_guideSlug: {
        userId: session.user.id,
        guideSlug: slug,
      },
    },
    update: {
      stepsComplete,
      totalSteps,
      completed,
      completedStepsCsv: encodeSteps(completedSteps),
    },
    create: {
      userId: session.user.id,
      guideSlug: slug,
      stepsComplete,
      totalSteps,
      completed,
      completedStepsCsv: encodeSteps(completedSteps),
    },
  })

  return NextResponse.json({ stepsComplete, totalSteps, completed })
}

// --- helpers ---

function encodeSteps(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  return arr.join(',')
}

function decodeSteps(csv) {
  if (!csv) return []
  return csv.split(',').map(s => Number(s)).filter(n => Number.isInteger(n))
}
