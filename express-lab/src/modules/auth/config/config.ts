import type {StringValue} from 'ms'

export const config: {
  jwt: {
    secret: string
    expiresIn: StringValue
  }
} = {
  jwt: {
    secret: process.env.JWT_SECRET || '123',
    expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as StringValue
  }
} as const
