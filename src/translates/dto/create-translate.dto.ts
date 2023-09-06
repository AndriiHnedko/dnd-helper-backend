import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsNotEmpty } from 'class-validator';
import { TranslateDto } from './translate.dto';

export class CreateTranslateDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslateDto)
  @ApiProperty({ isArray: true, type: TranslateDto })
  translates: TranslateDto[];
}
