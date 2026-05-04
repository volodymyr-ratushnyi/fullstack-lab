import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { HealthQuery } from 'src/health/application/queries/health.query';
import { Public } from 'src/shared/decorators/metadata/public.decodator';

@Public()
@Controller()
export class HealthController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  health() {
    return this.queryBus.execute(new HealthQuery());
  }
}
