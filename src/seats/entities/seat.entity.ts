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
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  theatre_id: string;

  @ManyToOne(() => Theatre, (theatre) => theatre.seats)
  @JoinColumn({ name: 'theatre_id' })
  theatre: Theatre;

  @OneToMany(() => Ticket, (ticket) => ticket.seat)
  tickets: Ticket[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at?: Date;
}
