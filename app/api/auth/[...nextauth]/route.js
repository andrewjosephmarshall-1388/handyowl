import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const REF_COOKIE = 'handy_owl_ref'

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        })
        if (!user?.passwordHash) return null

        const valid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!valid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
          stripeCustomerId: user.stripeCustomerId,
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.plan = token.plan ?? 'FREE'
        session.user.stripeCustomerId = token.stripeCustomerId ?? null
      }
      return session
    },
    async jwt({ token, user }) {
      // On sign-in, populate from the returned user
      if (user) {
        token.plan = user.plan ?? 'FREE'
        token.stripeCustomerId = user.stripeCustomerId ?? null
      }
      // Refresh plan + stripeCustomerId from DB on each request so
      // webhook-driven updates (Stripe → DB) flow into the session.
      if (token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { plan: true, stripeCustomerId: true },
        })
        if (dbUser) {
          token.plan = dbUser.plan
          token.stripeCustomerId = dbUser.stripeCustomerId
        }
      }
      return token
    },
  },

  events: {
    // Fires when the Prisma adapter creates a new user — which for us only
    // happens on the Google OAuth signup path (credentials signups go through
    // /api/auth/signup directly and handle referral attribution there).
    // Read the handy_owl_ref cookie and persist it onto the new User row.
    async createUser({ user }) {
      try {
        const cookieStore = cookies()
        const ref = cookieStore.get(REF_COOKIE)?.value
        if (!ref) return

        await prisma.user.update({
          where: { id: user.id },
          data: {
            referredBy: ref,
            referredAt: new Date(),
          },
        })
        // NOTE: we can't clear the cookie from this event handler (no response
        // object available here). The cookie just expires on its own 30-day
        // TTL. Safe because attribution only fires once per user (the createUser
        // event runs exactly once per user lifetime).
      } catch (err) {
        // Never let attribution bookkeeping break a signup.
        console.error('Referral attribution failed for user', user.id, err)
      }
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
