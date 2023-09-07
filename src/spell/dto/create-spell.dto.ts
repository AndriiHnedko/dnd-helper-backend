import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Exist } from '../../validators';

export class CreateSpellDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(9)
  @ApiProperty()
  level: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  school: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  castingTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  range: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  components: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  materialComponents?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  duration: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  higherLevelsDescription?: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @Exist('characterClass')
  @ApiProperty({
    type: 'number',
    isArray: true,
  })
  characterClasses: number[];
}
