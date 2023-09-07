import { ApiProperty } from '@nestjs/swagger';
import { Spell } from '@prisma/client';
import { CharacterClassEntity } from '../../character-class/entities/character-class.entity';

export class SpellEntity implements Spell {
  constructor({ characterClasses, ...data }: Partial<SpellEntity>) {
    Object.assign(this, data);

    if (characterClasses) {
      this.characterClasses = characterClasses.map(
        (item) => new CharacterClassEntity(item),
      );
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  school: string;

  @ApiProperty()
  castingTime: string;

  @ApiProperty()
  range: string;

  @ApiProperty()
  components: string;

  @ApiProperty({ nullable: true })
  materialComponents: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true })
  higherLevelsDescription: string;

  @ApiProperty({ type: CharacterClassEntity, isArray: true, nullable: true })
  characterClasses?: CharacterClassEntity[];
}
