import { ApiProperty } from '@nestjs/swagger';

export class CreateTheatreDto {
  @ApiProperty()
  name: string;
}
