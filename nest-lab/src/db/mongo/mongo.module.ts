import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'src/config/config.module';
import { AppConfigService } from 'src/config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        uri: config.mongoUrl,
      }),
    }),
  ],
})
export class MongoModule {}
