import { ApiProperty } from '@nestjs/swagger';
import { GetPaginationArgs } from '@src/global.input';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetMoviesDto extends GetPaginationArgs {
  @Transform(({ value }) => {
    if (value === 'false') {
      return false;
    }
    return true;
  })
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  released: boolean = true;
}
