import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongoModule } from './mongo/mongo.module';
import { PostgresModule } from './postgres/postgres.module';

@Module({
  imports: [MongoModule, PostgresModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
