import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

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

  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
