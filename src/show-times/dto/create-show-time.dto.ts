import { ApiProperty } from '@nestjs/swagger';

export class CreateShowTimeDto {
  @ApiProperty()
  movie_id: string;

  @ApiProperty()
  theatre_id: string;

  @ApiProperty()
  time: Date;
}
