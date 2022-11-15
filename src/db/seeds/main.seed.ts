import { Movie } from '@src/movies/entities/movie.entity';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Theatre } from '@src/theatres/entities/theatre.entity';
import { Seat } from '@src/seats/entities/seat.entity';
import { ShowTime } from '@src/show-times/entities/show-time.entity';
import { Ticket } from '@src/tickets/entities/ticket.entity';

export default class MainSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const movies = await factory(Movie)().createMany(4);
    const theatres = await factory(Theatre)().createMany(3);

    const stl: ShowTime[] = [];
    for (const movie of movies) {
      const date = new Date();
      const dateCopy = new Date(date.getTime());

      const st1 = await factory(ShowTime)().create({
        movie_id: movie.id,
        theatre_id: theatres[0].id,
        time: new Date(dateCopy.setHours(0, 0, 0, 0)),
      });

      const st2 = await factory(ShowTime)().create({
        movie_id: movie.id,
        theatre_id: theatres[0].id,
        time: new Date(dateCopy.setHours(11, 0, 0, 0)),
      });

      const st3 = await factory(ShowTime)().create({
        movie_id: movie.id,
        theatre_id: theatres[1].id,
        time: new Date(dateCopy.setHours(13, 30, 0, 0)),
      });

      stl.push(...[st1, st2, st3]);
    }

    const seats: Seat[] = [];
    for (const theatre of theatres) {
      const result = await factory(Seat)().createMany(5, {
        theatre_id: theatre.id,
      });
      seats.push(...result);
    }

    for (const round of [...Array(4).keys()]) {
      await factory(Ticket)().create({
        show_time_id: stl[round].id,
        seat_id: seats[round].id,
      });
    }
  }
}
