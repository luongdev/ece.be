import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './shared/http/http.response';
import { HttpStatusFilter } from './shared/http/http-status.filter';
import { AppService } from './app.service';
import * as passport from 'passport';
import { env } from 'process';

const serverPort = parseInt(env.SERVER_PORT || '4000');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  const appService = app.get(AppService);

  app.useLogger(appService.logger);
  app.setGlobalPrefix('/api');
  app.enableCors({});
  app.use(passport.initialize());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('BE API')
    .setVersion('1.0')
    .build();

  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    appService.logger.info(`Swagger listening on http://0.0.0.0:${serverPort}/docs`);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpStatusFilter(app.get(HttpAdapterHost)));

  await app.listen(serverPort);
}

bootstrap().catch(console.error);
