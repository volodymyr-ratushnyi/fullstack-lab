import {api} from '@/shared/lib/api'
import Credentials from "@auth/core/providers/credentials"
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {NextResponse} from 'next/server'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        return api.post('/login', credentials)
      }
    })
  ],
  callbacks: {
    async signIn({user, account}) {
      if (account?.provider !== "credentials") {
        return api.post("/login", {
          email: user.email,
          name: user.name,
          provider: account?.provider,
          externalId: account?.providerAccountId
        })
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) token.backendId = user.id
      return token
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user
      const isAuthPage = nextUrl.pathname.startsWith('/auth/login')
      return isLoggedIn
        ? isAuthPage
          ? NextResponse.redirect(new URL("/", nextUrl))
          : true
        : isAuthPage
          ? true
          : NextResponse.redirect(new URL(`/auth/login?callbackUrl=${nextUrl.pathname}`, nextUrl))
    },
  },
  pages: {
    signIn: '/auth/login'
  }
})
