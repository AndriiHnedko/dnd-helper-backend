import { ApiProperty } from '@nestjs/swagger';
import { Character } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CharacterClassEntity } from '../../character-class/entities/character-class.entity';
import { CharacterSubClassEntity } from '../../character-sub-class/entities/character-sub-class.entity';
import { SpellEntity } from '../../spell/entities/spell.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class CharacterEntity implements Character {
  constructor({
    user,
    characterClass,
    characterSubClass,
    spells,
    ...data
  }: Partial<CharacterEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }
    if (characterClass) {
      this.characterClass = new CharacterClassEntity(characterClass);
    }
    if (characterSubClass) {
      this.characterClass = new CharacterSubClassEntity(characterSubClass);
    }
    if (spells) {
      this.spells = spells.map((item) => new SpellEntity(item));
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  level: number;

  @Exclude()
  classId: number;

  @Exclude()
  subClassId: number;

  @Exclude()
  userId: number;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  @ApiProperty({ type: CharacterClassEntity })
  characterClass: CharacterClassEntity;

  @ApiProperty({ type: CharacterSubClassEntity })
  characterSubClass: CharacterSubClassEntity;

  @ApiProperty({ type: SpellEntity, isArray: true })
  spells: SpellEntity[];
}
