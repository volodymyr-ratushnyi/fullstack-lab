import { Module } from '@nestjs/common';
import { LoginHandler } from 'src/auth/applications/commands/login/login.handler';
import { RegisterHandler } from 'src/auth/applications/commands/register/register.handler';
import { JwtTokenService } from 'src/auth/services/token/jwt-token.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [JwtTokenService, RegisterHandler, LoginHandler],
  exports: [JwtTokenService],
})
export class AuthModule {}
