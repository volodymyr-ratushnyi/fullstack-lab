import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let configService: { get: ReturnType<typeof vi.fn> };

  const mockEnv = {
    NODE_ENV: 'test',
    GIT_COMMIT: 'abc123',
    COOKIES_SECRET: 'cookies-secret',
    JWT_SECRET: 'jwt-secret',
    JWT_EXPIRES_IN: '1h',
    DB_TYPE: 'mongodb',
    MONGO_USER: 'user',
    MONGO_PASSWORD: 'password',
    MONGO_HOST: 'localhost',
    MONGO_PORT: '27017',
    MONGO_DB: 'testdb',
    GOOGLE_APP_EMAIL: 'test@gmail.com',
    GOOGLE_APP_PASSWORD: 'app-password',
  };

  beforeEach(async () => {
    configService = {
      get: vi.fn((key: string) => mockEnv[key]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be return nodeEnv', () => {
    expect(service.nodeEnv).toBe(mockEnv.NODE_ENV);
  });

  it('should be return nodeEnv', () => {
    expect(service.gitCommit).toBe(mockEnv.GIT_COMMIT);
  });

  it('should be return cookiesSecret', () => {
    expect(service.cookiesSecret).toBe(mockEnv.COOKIES_SECRET);
  });

  it('should be return jwtSecret', () => {
    expect(service.jwtSecret).toBe(mockEnv.JWT_SECRET);
  });

  it('should be return jwtExpiresIn', () => {
    expect(service.jwtExpiresIn).toBe(mockEnv.JWT_EXPIRES_IN);
  });

  it('should be return dbType', () => {
    expect(service.dbType).toBe(mockEnv.DB_TYPE);
  });

  it('should be return mongoUrl у правильному форматі', () => {
    const expected = `mongodb://${mockEnv.MONGO_USER}:${mockEnv.MONGO_PASSWORD}@${mockEnv.MONGO_HOST}:${mockEnv.MONGO_PORT}/${mockEnv.MONGO_DB}?authSource=admin`;
    expect(service.mongoUrl).toBe(expected);
  });

  it('should be return googleAppEmail', () => {
    expect(service.googleAppEmail).toBe(mockEnv.GOOGLE_APP_EMAIL);
  });

  it('should be return googleAppPassword', () => {
    expect(service.googleAppPassword).toBe(mockEnv.GOOGLE_APP_PASSWORD);
  });
});
