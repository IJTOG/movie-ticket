import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTheatreDto } from './dto/create-theatre.dto';
import { GetTheatresDto } from './dto/get-theatres.dto';
import { Theatre } from './entities/theatre.entity';

@Injectable()
export class TheatresService {
  constructor(
    @InjectRepository(Theatre)
    private theatreRepository: Repository<Theatre>,
  ) {}

  create(createTheatreDto: CreateTheatreDto) {
    return this.theatreRepository.save({ ...createTheatreDto });
  }

  async findAll({ page, size }: GetTheatresDto) {
    const query = this.theatreRepository.createQueryBuilder('theatre');

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
    return this.theatreRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    return this.theatreRepository.softRemove(record);
  }
}
