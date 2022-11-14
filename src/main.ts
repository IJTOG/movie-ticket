import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MoviesModule } from './movies/movies.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MovieTicket')
    .setDescription('Movie Ticket Microservice API')
    .setVersion('v1')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    include: [MoviesModule],
  };

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
