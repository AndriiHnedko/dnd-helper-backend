import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TranslateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  key: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  translate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  language: string;
}
