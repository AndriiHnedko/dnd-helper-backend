import { ApiProperty } from '@nestjs/swagger';
import { CharacterSubClass } from '@prisma/client';

export class CharacterSubClassEntity implements CharacterSubClass {
  constructor(partial: Partial<CharacterSubClassEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  classId: number;
}
