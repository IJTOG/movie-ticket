import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MoviesModule } from './movies/movies.module';
import { SeatsModule } from './seats/seats.module';
import { ShowTimsModule } from './show-times/show-times.module';
import { TheatresModule } from './theatres/theatres.module';
import { TicketModule } from './tickets/tickets.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');

  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MovieTicket')
    .setDescription('Movie Ticket Microservice API')
    .setVersion('v1')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    include: [
      MoviesModule,
      TicketModule,
      TheatresModule,
      SeatsModule,
      ShowTimsModule,
    ],
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
