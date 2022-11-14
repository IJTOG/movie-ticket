import { ApiProperty } from '@nestjs/swagger';
import { GetPaginationArgs } from '@src/global.input';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetTheatresDto extends GetPaginationArgs {}
