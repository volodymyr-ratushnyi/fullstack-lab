import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
          type: config.dbType,
          host: config.postgresHost,
          port: config.postgresPort,
          username: config.postgresUser,
          password: config.postgresPassword,
          database: config.postgresDb,
          autoLoadEntities: true,
          synchronize: true,
      })
    }),
  ],
})
export class PostgresModule {}
