import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeatDto } from './dto/create-seat.dto';
import { GetSeatsDto } from './dto/get-seats.dto';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  create(createSeatDto: CreateSeatDto) {
    return this.seatRepository.save({ ...createSeatDto });
  }

  async findAll({ page, size }: GetSeatsDto) {
    const query = this.seatRepository.createQueryBuilder('theatre');

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
    return this.seatRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    return this.seatRepository.softRemove(record);
  }
}
