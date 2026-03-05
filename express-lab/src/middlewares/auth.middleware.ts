import {config} from '@auth/config/config.ts'
import jwt from 'jsonwebtoken'
import type {NextFunction, Request, Response} from 'express'
import type {JwtUserPayload} from 'src/types/express.d.ts'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.signedCookies.token
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' })

  try {
    req.user = jwt.verify(token, config.jwt.secret) as JwtUserPayload
    next()
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' })
  }
}
