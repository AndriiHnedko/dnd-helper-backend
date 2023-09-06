import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteTranslateDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({
    type: 'number',
    isArray: true,
  })
  ids: number[];
}
