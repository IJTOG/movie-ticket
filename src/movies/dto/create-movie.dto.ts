import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty()
  name_th: string;

  @ApiProperty()
  name_en: string;

  @ApiProperty()
  description_th: string;

  @ApiProperty()
  description_en: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  running_time: number;

  @ApiProperty()
  release_date: Date;

  @ApiProperty()
  end_at: Date;
}
