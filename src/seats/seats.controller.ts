import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { GetSeatsDto } from './dto/get-seats.dto';

@ApiTags('Seats')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatsService.create(createSeatDto);
  }

  @Get()
  findAll(@Query() query: GetSeatsDto) {
    return this.seatsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatsService.remove(+id);
  }
}
