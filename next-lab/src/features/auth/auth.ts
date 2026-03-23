import {authConfig} from '@/features/auth/config/auth.config'
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
