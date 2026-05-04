import type { MockInstance, Mocked } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import jwt from 'jsonwebtoken';
import { JwtTokenService } from './jwt-token.service';
import { AppConfigService } from 'src/shared/config/config.service';

vi.mock('jsonwebtoken');

describe('JwtTokenService', () => {
  let service: JwtTokenService;
  let configService: Mocked<AppConfigService>;

  const mockConfig = {
    jwtSecret: 'test-secret',
    jwtExpiresIn: '1h',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtTokenService,
        {
          provide: AppConfigService,
          useValue: mockConfig,
        },
      ],
    }).compile();

    service = module.get<JwtTokenService>(JwtTokenService);
    configService = module.get(AppConfigService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('sign()', () => {
    it('should return token', () => {
      const payload = { sub: '123', email: 'test@test.com' };
      const fakeToken = 'mocked.jwt.token';

      (jwt.sign as unknown as MockInstance).mockReturnValue(fakeToken);

      const result = service.sign(payload);

      expect(result).toBe(fakeToken);
      expect(jwt.sign).toHaveBeenCalledWith(payload, mockConfig.jwtSecret, {
        expiresIn: mockConfig.jwtExpiresIn,
      });
    });
  });

  describe('verify()', () => {
    it('should return payload when valid token', () => {
      const fakePayload = { sub: '123', email: 'test@test.com' };

      (jwt.verify as unknown as MockInstance).mockReturnValue(fakePayload);

      const result = service.verify('some.token.here');

      expect(result).toEqual(fakePayload);
      expect(jwt.verify).toHaveBeenCalledWith(
        'some.token.here',
        mockConfig.jwtSecret,
      );
    });
  });
});
