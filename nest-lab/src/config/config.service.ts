import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../config/config.schema';

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

  get postgresHost() {
    return this.config.get('POSTGRES_HOST', { infer: true });
  }
  get postgresPort() {
    return this.config.get('POSTGRES_PORT', { infer: true });
  }
  get postgresUser() {
    return this.config.get('POSTGRES_USER', { infer: true });
  }
  get postgresPassword() {
    return this.config.get('POSTGRES_PASSWORD', { infer: true });
  }
  get postgresDb() {
    return this.config.get('POSTGRES_DB', { infer: true });
  }

  get mongoUrl() {
    return `mongodb://${this.mongoUser}:${this.mongoPassword}@${this.mongoHost}:${this.mongoPort}/${this.mongoDb}?authSource=admin`;
  }
  get mongoUser() {
    return this.config.get('MONGO_USER', { infer: true });
  }
  get mongoPassword() {
    return this.config.get('MONGO_PASSWORD', { infer: true });
  }
  get mongoHost() {
    return this.config.get('MONGO_HOST', { infer: true });
  }
  get mongoPort() {
    return this.config.get('MONGO_PORT', { infer: true });
  }
  get mongoDb() {
    return this.config.get('MONGO_DB', { infer: true });
  }
}
