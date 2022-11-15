import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GetTicketsDto } from './dto/get-tickets.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  create(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.save({ ...createTicketDto });
  }

  async findAll({ page, size }: GetTicketsDto) {
    const query = this.ticketRepository.createQueryBuilder('movie');

    const [results, total_count] = await query
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    return {
      results,
      size,
      page,
      total_count,
    };
  }

  findOne(id: string) {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async cancel(id: string) {
    const record = await this.findOne(id);
    return this.ticketRepository.remove(record);
  }
}
