import { ApiProperty } from '@nestjs/swagger';
import { Character } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../../users/entities/user.entity';

export class CharacterEntity implements Character {
  constructor({ user, ...data }: Partial<CharacterEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
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
  //todo class

  @Exclude()
  subClassId: number;
  //todo subclass

  @Exclude()
  userId: number;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}
