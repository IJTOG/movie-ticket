import { Seat } from '@src/seats/entities/seat.entity';
import { ShowTime } from '@src/show-times/entities/show-time.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Theatre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Seat, (seat) => seat.theatre)
  seats: Seat[];

  @OneToMany(() => ShowTime, (showTime) => showTime.movie)
  show_times: ShowTime[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;
}
