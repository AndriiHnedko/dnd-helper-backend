import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';

@Injectable()
export class SpellService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSpellDto: CreateSpellDto) {
    return this.prismaService.spell.create({ data: createSpellDto });
  }

  findAll() {
    return this.prismaService.spell.findMany();
  }

  findOne(id: number) {
    return this.prismaService.spell.findFirstOrThrow({ where: { id } });
  }

  update(id: number, updateSpellDto: UpdateSpellDto) {
    return this.prismaService.spell.update({
      where: { id },
      data: updateSpellDto,
    });
  }

  remove(id: number) {
    return this.prismaService.spell.delete({ where: { id } });
  }
}
