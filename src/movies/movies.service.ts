import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.save({ ...createMovieDto });
  }

  async findAll({ page, size, released }: GetMoviesDto) {
    const query = this.movieRepository.createQueryBuilder('movie');

    if (released) {
      query.andWhere('release_date >= NOW()');
    } else {
      query.andWhere('release_date < NOW()');
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

  findOne(id: string) {
    return this.movieRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    return this.movieRepository.softRemove(record);
  }
}
