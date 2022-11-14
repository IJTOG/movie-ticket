import { Movie } from '@src/movies/entities/movie.entity';
import { Ticket } from '@src/tickets/entities/ticket.entity';
import { Theatre } from '@src/theatres/entities/theatre.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ShowTime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  time: Date;

  @Column()
  movie_id: string;

  @ManyToOne(() => Movie, (movie) => movie.show_times)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column()
  theatre_id: string;

  @ManyToOne(() => Theatre, (theatre) => theatre.show_times)
  @JoinColumn({ name: 'theatre_id' })
  theatre: Theatre;

  @OneToMany(() => Ticket, (ticket) => ticket.show_time)
  tickets: Ticket[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;
}
