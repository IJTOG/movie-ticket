import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from '@src/seats/entities/seat.entity';
import { ShowTime } from '@src/show-times/entities/show-time.entity';
import { Theatre } from '@src/theatres/entities/theatre.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { GetTicketsDto } from './dto/get-tickets.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Theatre)
    private theatreRepository: Repository<Theatre>,
    @InjectRepository(ShowTime)
    private showtimeRepository: Repository<ShowTime>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const seat = await this.seatRepository.findOne({
      where: { id: createTicketDto.seat_id },
    });

    const theatre = await this.theatreRepository.findOne({
      where: { id: seat.theatre_id },
    });

    const showtime = await this.showtimeRepository.findOne({
      where: { id: createTicketDto.show_time_id },
    });

    if (showtime.theatre_id !== theatre.id) {
      throw new BadRequestException();
    }

    const ticket = await this.ticketRepository.findOne({
      where: {
        seat_id: createTicketDto.seat_id,
        show_time_id: createTicketDto.show_time_id,
      },
    });

    if (ticket) {
      throw new BadRequestException();
    }

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
