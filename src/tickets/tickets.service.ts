import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
    const queryRunner =
      this.ticketRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tickets: Ticket[] = [];
      for (const reqSeat of createTicketDto.seats) {
        const seat = await this.seatRepository.findOne({
          where: { id: reqSeat.seat_id },
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
        const ticket = await queryRunner.manager.findOne(Ticket, {
          where: {
            seat_id: reqSeat.seat_id,
            show_time_id: createTicketDto.show_time_id,
          },
        });
        if (ticket) {
          throw new BadRequestException();
        }

        const plainTicket = new Ticket();
        plainTicket.seat_id = reqSeat.seat_id;
        plainTicket.show_time_id = createTicketDto.show_time_id;

        tickets.push(plainTicket);
      }

      await queryRunner.manager.save(tickets);

      await queryRunner.commitTransaction();
    } catch (error) {
      /* istanbul ignore next */
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }

    return { success: true };
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
    if (!record) {
      throw new NotFoundException();
    }
    return this.ticketRepository.remove(record);
  }
}
