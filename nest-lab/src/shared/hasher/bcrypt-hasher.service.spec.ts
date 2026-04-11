import { Test, TestingModule } from '@nestjs/testing';
import { BcryptHasherService } from 'src/shared/hasher/bcrypt-hasher.service';

describe('HasherService', () => {
  let service: BcryptHasherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptHasherService],
    }).compile();

    service = module.get<BcryptHasherService>(BcryptHasherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
