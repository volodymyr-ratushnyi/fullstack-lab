import { Module } from '@nestjs/common';
import { GlobalCqrsModule } from 'src/shared/cqrs/cqrs.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongoModule } from './db/mongo/mongo.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [GlobalCqrsModule, MongoModule, PrismaModule, AuthModule, UserModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
