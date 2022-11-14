import { ApiProperty } from '@nestjs/swagger';
import { GetPaginationArgs } from '@src/global.input';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetShowTimesDto extends GetPaginationArgs {
  @IsOptional()
  @ApiProperty({ required: false })
  movie_id: string;

  @IsOptional()
  @ApiProperty({ required: false })
  time: Date;
}
