import { Global, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HasherModule } from './hasher/hasher.module';
import { GlobalCqrsModule } from './cqrs/cqrs.module';
import { AppConfigModule } from './config/config.module';

@Global()
@Module({
  imports: [AuthModule, HasherModule, GlobalCqrsModule, AppConfigModule],
  exports: [HasherModule, GlobalCqrsModule, AppConfigModule],
}) export class SharedModule {}
