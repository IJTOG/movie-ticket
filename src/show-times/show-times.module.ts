import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowTime } from './entities/show-time.entity';
import { ShowTimesController } from './show-times.controller';
import { ShowTimesService } from './show-times.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShowTime])],
  controllers: [ShowTimesController],
  providers: [ShowTimesService],
})
export class ShowTimsModule {}
