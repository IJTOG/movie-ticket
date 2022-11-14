import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetPaginationArgs {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  page: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  size: number = 20;
}
