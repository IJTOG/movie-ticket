import { Module } from '@nestjs/common';
import { TheatresService } from './theatres.service';
import { TheatresController } from './theatres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theatre } from './entities/theatre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theatre])],
  controllers: [TheatresController],
  providers: [TheatresService],
})
export class TheatresModule {}
