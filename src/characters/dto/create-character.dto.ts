import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString, IsNumber } from 'class-validator';
import { Exist } from '../../validators';

export class CreateCharacterDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  level: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @Exist('spell')
  @ApiProperty({
    type: 'number',
    isArray: true,
  })
  spells: number[];

  @IsNotEmpty()
  @IsNumber()
  @Exist('class')
  @ApiProperty()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  @Exist('subClass')
  @ApiProperty()
  subClassId: number;
}
