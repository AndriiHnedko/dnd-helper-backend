import { ApiProperty } from '@nestjs/swagger';
import { CharacterClass } from '@prisma/client';

export class CharacterClassEntity implements CharacterClass {
  constructor(partial: Partial<CharacterClassEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
