import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharactersService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createCharacterDto: CreateCharacterDto) {
    return this.prisma.character.create({
      data: {
        ...createCharacterDto,
        userId,
        spells: {
          connect: createCharacterDto.spells.map((id) => ({ id })),
        },
      },
      include: { class: true, subClass: true, spells: true, user: true },
    });
  }

  findAll(userId: number) {
    return this.prisma.character.findMany({
      where: { userId },
      include: { class: true, subClass: true, spells: true, user: true },
    });
  }

  findOneOrThrow(userId: number, id: number) {
    return this.prisma.character.findFirstOrThrow({
      where: { userId, id },
      include: { class: true, subClass: true, spells: true, user: true },
    });
  }

  async update(
    userId: number,
    id: number,
    updateCharacterDto: UpdateCharacterDto,
  ) {
    await this.findOneOrThrow(userId, id);
    return this.prisma.character.update({
      where: { userId, id },
      data: {
        ...updateCharacterDto,
        spells: {
          connect: updateCharacterDto.spells.map((id) => ({ id })),
        },
      },
      include: { class: true, subClass: true, spells: true, user: true },
    });
  }

  async remove(userId: number, id: number) {
    await this.findOneOrThrow(userId, id);
    return this.prisma.character.delete({ where: { userId, id } });
  }
}
