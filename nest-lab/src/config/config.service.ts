import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { EnvConfig } from '../config/config.schema';

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService<EnvConfig, true>) {}
  get cookiesSecret() {
    return this.config.get('COOKIES_SECRET', { infer: true });
  }

  get jwtSecret() {
    return this.config.get('JWT_SECRET', { infer: true });
  }
  get jwtExpiresIn() {
    return this.config.get('JWT_EXPIRES_IN', { infer: true });
  }

  get dbType() {
    return this.config.get('DB_TYPE', { infer: true });
  }

  get mongoUrl() {
    return this.config.get('MONGO_URL', { infer: true });
  }
}
