import { faker } from '@faker-js/faker';
import { Theatre } from '@src/theatres/entities/theatre.entity';
import { define, factory } from 'typeorm-seeding';

define(Theatre, () => {
  const record = new Theatre();
  record.name = 'Theatre' + faker.random.numeric(3);

  return record;
});

export async function createTheatre(
  attrs: Partial<Theatre> = {},
): Promise<Theatre> {
  return await factory(Theatre)().create(attrs);
}
