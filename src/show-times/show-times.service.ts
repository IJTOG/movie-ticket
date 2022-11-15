import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { CreateShowTimeDto } from './dto/create-show-time.dto';
import { GetShowTimesDto } from './dto/get-show-times.dto';
import { ShowTime } from './entities/show-time.entity';

@Injectable()
export class ShowTimesService {
  constructor(
    @InjectRepository(ShowTime)
    private showTimeRepository: Repository<ShowTime>,
  ) {}

  create(createShowTimeDto: CreateShowTimeDto) {
    return this.showTimeRepository.save({ ...createShowTimeDto });
  }

  async findAll({ page, size, movie_id, time }: GetShowTimesDto) {
    const query = this.showTimeRepository
      .createQueryBuilder('show_time')
      .where('time >= NOW()');

    if (movie_id) {
      query.andWhere('movie_id = :movie_id', { movie_id });
    }
    if (time) {
      query.andWhere('time = :movie_id', { time });
    }

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

  async findAllSeats(id: string) {
    const query = this.showTimeRepository
      .createQueryBuilder('show_time')
      .where({ id })
      .andWhere('show_time.time >= NOW()')
      .innerJoinAndSelect('show_time.theatre', 'theatre')
      .innerJoinAndSelect('theatre.seats', 'seat')
      .leftJoinAndSelect(
        'seat.tickets',
        `ticket`,
        `ticket.show_time_id = '${id}'`,
      );

    const result = await query.getOne();
    return result;
  }

  findOne(id: string) {
    return this.showTimeRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    return this.showTimeRepository.softRemove(record);
  }
}
