import type {Hasher} from '@auth/domain/services/hasher.interface.ts'
import {compare} from 'bcryptjs'

export class BcryptHasherService implements Hasher{
  public async compare(plain: string, hashed: string) {
    return await compare(plain, hashed)
  }
}
