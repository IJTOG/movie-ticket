import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetTicketsDto } from './dto/get-tickets.dto';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';

@ApiTags('Tickets')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  book(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll(@Query() query: GetTicketsDto) {
    return this.ticketsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Delete(':id')
  cancel(@Param('id') id: string) {
    return this.ticketsService.cancel(id);
  }
}
