import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fastifyCookie from '@fastify/cookie';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { cookieConstants } from './api/auth/guard/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie, {
    secret: cookieConstants.secret,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
