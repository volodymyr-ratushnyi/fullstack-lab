import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cookiesSecret = process.env.COOKIES_SECRET;
  app.use(cookieParser(cookiesSecret));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then(() => {
  console.log(`Listened::: ${process.env.PORT ?? 3000}`);
});
