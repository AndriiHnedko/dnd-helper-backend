import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCharacterSubClassDto } from './dto/create-character-sub-class.dto';
import { UpdateCharacterSubClassDto } from './dto/update-character-sub-class.dto';

@Injectable()
export class CharacterSubClassService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCharacterSubClassDto: CreateCharacterSubClassDto) {
    return this.prismaService.characterSubClass.create({
      data: createCharacterSubClassDto,
    });
  }

  findAll() {
    return this.prismaService.characterSubClass.findMany();
  }

  findOne(id: number) {
    return this.prismaService.characterSubClass.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: number, updateCharacterSubClassDto: UpdateCharacterSubClassDto) {
    return this.prismaService.characterSubClass.update({
      where: { id },
      data: updateCharacterSubClassDto,
    });
  }

  remove(id: number) {
    return this.prismaService.characterSubClass.delete({ where: { id } });
  }
}
