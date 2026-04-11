import { Injectable } from '@nestjs/common';
import { Hasher } from 'src/shared/hasher/hasher';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class BcryptHasherService implements Hasher {
  public async compare(plain: string, hashed: string) {
    return await compare(plain, hashed);
  }

  public async hash(plain: string) {
    return await hash(plain, 10);
  }
}
