import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString, IsOptional } from 'class-validator';

export class CreateCharacterClassDto {
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
}
