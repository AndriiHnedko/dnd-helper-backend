import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCharacterClassDto } from './dto/create-character-class.dto';
import { UpdateCharacterClassDto } from './dto/update-character-class.dto';

@Injectable()
export class CharacterClassService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCharacterClassDto: CreateCharacterClassDto) {
    return this.prismaService.characterClass.create({
      data: createCharacterClassDto,
    });
  }

  findAll() {
    return this.prismaService.characterClass.findMany();
  }

  findOne(id: number) {
    return this.prismaService.characterClass.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: number, updateCharacterClassDto: UpdateCharacterClassDto) {
    return this.prismaService.characterClass.update({
      where: { id },
      data: updateCharacterClassDto,
    });
  }

  remove(id: number) {
    return this.prismaService.characterClass.delete({ where: { id } });
  }
}
