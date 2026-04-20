import { Injectable } from '@nestjs/common';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { AppConfigService } from 'src/shared/config/config.service';

@Injectable()
export class JwtTokenService {
  constructor(private readonly config: AppConfigService) {}

  public sign(payload: JwtPayload): string {
    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: this.config.jwtExpiresIn,
    });
  }

  public verify(token: string): JwtPayload {
    return jwt.verify(token, this.config.jwtSecret) as JwtPayload;
  }
}
