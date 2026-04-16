import { Module } from '@nestjs/common';
import { LoginHandler } from 'src/auth/applications/commands/login/login.handler';
import { RegisterHandler } from 'src/auth/applications/commands/register/register.handler';
import { TokenService } from 'src/auth/services/token/token.service';
import { HasherModule } from 'src/shared/hasher/hasher.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [HasherModule],
  controllers: [AuthController],
  providers: [TokenService, RegisterHandler, LoginHandler],
})
export class AuthModule {}
