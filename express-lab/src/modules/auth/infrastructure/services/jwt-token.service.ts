import {config} from '@auth/config/config.ts'
import type {TokenService} from '@auth/domain/services/token.interface.ts'
import jwt from 'jsonwebtoken'

export class JwtTokenService implements TokenService{
  public sign(payload: Record<string, unknown>): string {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
  }
}
