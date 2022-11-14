import { ApiProperty } from '@nestjs/swagger';

export class CreateSeatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  theatre_id: string;
}
