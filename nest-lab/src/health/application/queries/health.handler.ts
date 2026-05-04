import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HealthDto } from 'src/health/application/dtos/health.dto';
import { HealthQuery } from 'src/health/application/queries/health.query';
import { AppConfigService } from 'src/shared/config/config.service';
import { version } from '../../../../package.json';

@QueryHandler(HealthQuery)
export class HealthHandler implements IQueryHandler<HealthQuery> {
  constructor(private readonly config: AppConfigService) {}

  async execute({}: HealthQuery): Promise<HealthDto> {
    const health = new HealthDto();
    health.status = 'ok';
    health.version = version;
    health.revision = this.config.gitCommit
    health.docs = '/docs';
    return health;
  }
}
