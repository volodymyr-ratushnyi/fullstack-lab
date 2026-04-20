import { MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';
import { PrismaModule } from './db/prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongoModule } from './db/mongo/mongo.module';
import { MailModule } from './mail/mail.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './shared/guards/role.guard';

@Module({
  imports: [
    SharedModule,
    MongoModule,
    PrismaModule,
    AuthModule,
    UserModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    AppService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
