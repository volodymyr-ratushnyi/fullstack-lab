import { Module } from '@nestjs/common';
import { HealthHandler } from 'src/health/application/queries/health.handler';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  providers: [HealthHandler],
})
export class HealthModule {}
