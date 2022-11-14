import { Seat } from '@src/seats/entities/seat.entity';
import { ShowTime } from '@src/show-times/entities/show-time.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['show_time_id', 'seat_id'])
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  show_time_id: string;

  @ManyToOne(() => ShowTime, (showTime) => showTime.tickets)
  @JoinColumn({ name: 'show_time_id' })
  show_time: ShowTime;

  @Column()
  seat_id: string;

  @ManyToOne(() => Seat, (seat) => seat.tickets)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
