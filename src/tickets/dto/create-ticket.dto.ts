import { ApiProperty } from '@nestjs/swagger';

class SeatIDs {
  @ApiProperty()
  seat_id: string;
}

export class CreateTicketDto {
  @ApiProperty()
  show_time_id: string;

  @ApiProperty({ type: [SeatIDs] })
  seats: SeatIDs[];
}
