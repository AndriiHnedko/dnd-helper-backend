import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Exist } from '../../validators';

export class CreateCharacterSubClassDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @MinLength(3)
  @IsString()
  @ApiProperty()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Exist('characterClass')
  classId: number;
}
