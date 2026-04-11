import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { AppConfigService } from 'src/shared/config/config.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly config: AppConfigService,
  ) {}

  public sign(payload: Record<string, unknown>): string {
    return jwt.sign(payload, this.config.jwtSecret, { expiresIn: this.config.jwtExpiresIn });
  }
}
