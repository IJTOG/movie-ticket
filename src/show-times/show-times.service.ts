import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const query = this.showTimeRepository.createQueryBuilder('show_time');

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
      .innerJoinAndSelect('show_time.theatre', 'theatre')
      .innerJoinAndSelect('theatre.seats', 'seat')
      .leftJoinAndSelect('seat.tickets', 'ticket');

    const results = await query.getMany();
    return { results };
  }

  findOne(id: string) {
    return this.showTimeRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} theatre`;
  }
}
