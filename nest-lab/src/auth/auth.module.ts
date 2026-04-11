import { Module } from '@nestjs/common';
import { RegisterHandler } from 'src/auth/applications/commands/register/register.handler';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [RegisterHandler],
})
export class AuthModule {}
