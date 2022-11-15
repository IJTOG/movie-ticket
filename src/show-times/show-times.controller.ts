import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { ShowTimesService } from './show-times.service';
import { CreateShowTimeDto } from './dto/create-show-time.dto';
import { GetShowTimesDto } from './dto/get-show-times.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';

@ApiTags('Showtimes')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('showtimes')
export class ShowTimesController {
  constructor(private readonly showTimesService: ShowTimesService) {}

  @Post()
  create(@Body() createShowTimeDto: CreateShowTimeDto) {
    return this.showTimesService.create(createShowTimeDto);
  }

  @Get()
  findAll(@Query() query: GetShowTimesDto) {
    return this.showTimesService.findAll(query);
  }

  @Get(':id/seats')
  findAllSeats(@Param('id') id: string) {
    return this.showTimesService.findAllSeats(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showTimesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showTimesService.remove(id);
  }
}
