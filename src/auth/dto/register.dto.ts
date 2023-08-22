import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  password: string;
}
