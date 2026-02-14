import bcryptjs from "bcryptjs";
import prisma, { getUserFromDb } from "@/utils/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {User} from "@prisma/client";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/schemas/zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          const user = await getUserFromDb(email);
          if (!user || !user.password) {
            return null;
          }
          const isPasswordValid = await bcryptjs.compare(password, user.password);
          return isPasswordValid ? user : null;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

export const saltAndHashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcryptjs.hash(password, saltRounds);
}
