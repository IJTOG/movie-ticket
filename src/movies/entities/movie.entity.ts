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
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_th: string;

  @Column()
  name_en: string;

  @Column()
  description_th: string;

  @Column()
  description_en: string;

  @Column()
  type: string;

  @Column()
  running_time: number;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  release_date: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  end_at: Date;

  @OneToMany(() => ShowTime, (showTime) => showTime.movie)
  show_times: ShowTime[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;
}
