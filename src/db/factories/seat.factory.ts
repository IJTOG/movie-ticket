import { faker } from '@faker-js/faker';
import { Seat } from '@src/seats/entities/seat.entity';
import { define, factory } from 'typeorm-seeding';

define(Seat, () => {
  const record = new Seat();
  record.name = 'A' + faker.random.numeric(2);

  return record;
});

export async function createSeat(attrs: Partial<Seat> = {}): Promise<Seat> {
  return await factory(Seat)().create(attrs);
}
