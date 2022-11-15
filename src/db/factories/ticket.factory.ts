import { faker } from '@faker-js/faker';
import { Ticket } from '@src/tickets/entities/ticket.entity';
import { define, factory } from 'typeorm-seeding';

define(Ticket, () => {
  const movie = new Ticket();

  return movie;
});

export async function createTicket(
  attrs: Partial<Ticket> = {},
): Promise<Ticket> {
  return await factory(Ticket)().create(attrs);
}
