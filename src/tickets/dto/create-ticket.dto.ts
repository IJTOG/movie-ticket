import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  show_time_id: string;

  @ApiProperty()
  seat_id: string;
}
