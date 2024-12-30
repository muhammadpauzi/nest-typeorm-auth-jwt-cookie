import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ZodFilter } from './common/filters/zod.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import fastifyCookie from '@fastify/cookie';
import {
  ClassSerializerInterceptor,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JWT_COOKIE_TOKEN_KEY } from './auth/auth.constant';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('GoGoTes')
    .setDescription('The GoGoTes API Documentations')
    .setVersion('1.0')
    .addTag('gogotes')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new UnprocessableEntityException(
          errors.reduce((acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          }, {}),
        ),
    }),
  );
  app.useGlobalFilters(new ZodFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService = app.get(ConfigService);

  await app.register(fastifyCookie, {
    secret: configService.getOrThrow<string>('COOKIE_SECRET'),
  });
  await app.listen(parseInt(configService.get('PORT'), 10) ?? 3000);
}
bootstrap();
