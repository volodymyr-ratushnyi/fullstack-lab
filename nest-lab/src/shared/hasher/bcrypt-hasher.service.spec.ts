import { Test, TestingModule } from '@nestjs/testing';
import { type MockInstance } from 'vitest';
import { compare, hash } from 'bcryptjs';
import { BcryptHasherService } from './bcrypt-hasher.service';

vi.mock('bcryptjs');

describe('BcryptHasherService', () => {
  let service: BcryptHasherService;

  const mockedCompare = compare as unknown as MockInstance;
  const mockedHash = hash as unknown as MockInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptHasherService],
    }).compile();

    service = module.get<BcryptHasherService>(BcryptHasherService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('compare() should be bcryptjs.compare called', async () => {
    mockedCompare.mockResolvedValue(true);
    const plain = 'plain';
    const hashed = 'hashed';
    const result = await service.compare(plain, hashed);

    expect(result).toBe(true);
    expect(compare).toHaveBeenCalledWith(plain, hashed);
  });

  it('hash() should be return hashed row', async () => {
    const fakeHash = '$2a$10$abcdefghijklmnop';
    const plain = 'plain';
    mockedHash.mockResolvedValue(fakeHash);

    const result = await service.hash(plain);

    expect(result).toBe(fakeHash);
    expect(hash).toHaveBeenCalledWith(plain, 10);
  });
});
