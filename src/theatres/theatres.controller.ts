import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { TheatresService } from './theatres.service';
import { CreateTheatreDto } from './dto/create-theatre.dto';
import { GetTheatresDto } from './dto/get-theatres.dto';
import { ApiTags } from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';

@ApiTags('Theatres')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('theatres')
export class TheatresController {
  constructor(private readonly theatresService: TheatresService) {}

  @Post()
  create(@Body() createTheatreDto: CreateTheatreDto) {
    return this.theatresService.create(createTheatreDto);
  }

  @Get()
  findAll(@Query() query: GetTheatresDto) {
    return this.theatresService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.theatresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.theatresService.remove(id);
  }
}
