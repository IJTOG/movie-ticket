import { faker } from '@faker-js/faker';
import { ShowTime } from '@src/show-times/entities/show-time.entity';
import { define, factory } from 'typeorm-seeding';

define(ShowTime, () => {
  const record = new ShowTime();
  const date = new Date();
  date.setHours(13, 0, 0, 0);

  record.time = date;

  return record;
});

export async function createShowTime(
  attrs: Partial<ShowTime> = {},
): Promise<ShowTime> {
  return await factory(ShowTime)().create(attrs);
}
