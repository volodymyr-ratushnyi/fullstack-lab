import { Module } from '@nestjs/common';
import { BcryptHasherService } from 'src/shared/hasher/bcrypt-hasher.service';
import { Hasher } from 'src/shared/hasher/hasher';

@Module({
  providers: [
    {
      provide: Hasher,
      useClass: BcryptHasherService,
    }
  ],
  exports: [Hasher],
})
export class HasherModule {}
