import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongoModule } from './db/mongo/mongo.module';

@Module({
  imports: [MongoModule, PrismaModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
