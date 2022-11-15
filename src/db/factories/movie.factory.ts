import { faker } from '@faker-js/faker';
import { Movie } from '@src/movies/entities/movie.entity';
import { define, factory } from 'typeorm-seeding';

define(Movie, () => {
  const movie = new Movie();
  movie.name_en = faker.name.jobTitle();
  movie.name_th = faker.name.jobTitle();
  movie.description_en = faker.name.jobTitle();
  movie.description_th = faker.name.jobTitle();
  movie.running_time = Number(faker.random.numeric(3));
  movie.type = faker.random.word();
  movie.release_date = new Date();
  movie.end_at = new Date();

  return movie;
});

export async function createMovie(attrs: Partial<Movie> = {}): Promise<Movie> {
  return await factory(Movie)().create(attrs);
}
