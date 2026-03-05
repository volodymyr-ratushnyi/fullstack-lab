export interface JwtUserPayload {
  id: string
  role: 'user' | 'admin'
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload
    }
  }
}
