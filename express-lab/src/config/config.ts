import dotenv from "dotenv"

dotenv.config()

export const config: {
  cookies: {
    secret: string
  }
} = {
  cookies: {
    secret: process.env.COOKIES_SECRET || '123'
  }
} as const
