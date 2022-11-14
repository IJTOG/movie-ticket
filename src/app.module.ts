import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { DatabaseConfig } from './config/database';
import { MoviesModule } from './movies/movies.module';
import { SeatsModule } from './seats/seats.module';
import { ShowTimsModule } from './show-times/show-times.module';
import { TheatresModule } from './theatres/theatres.module';
import { TicketModule } from './tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    ConfigModule,
    MoviesModule,
    SeatsModule,
    TheatresModule,
    TicketModule,
    ShowTimsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
