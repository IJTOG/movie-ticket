import { ApiProperty } from '@nestjs/swagger';

export class CreateSeatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  theatre_id: string;
}
