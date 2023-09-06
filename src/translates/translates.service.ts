import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { TranslateDto } from './dto/translate.dto';

@Injectable()
export class TranslatesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAvailableLanguages() {
    const result = await this.prismaService.translate.groupBy({
      by: ['language'],
    });
    return result.map((item) => item.language);
  }

  async findAllByLanguage(language: string) {
    const result = await this.prismaService.translate.findMany({
      where: { language },
    });
    const translates: { [key: string]: string } = {};
    result.forEach((item) => {
      translates[item.key] = item.translate;
    });
    return translates;
  }

  create(translateDto: TranslateDto) {
    return this.prismaService.translate.create({ data: translateDto });
  }

  findOneByKey(language: string, key: string) {
    return this.prismaService.translate.findFirst({ where: { language, key } });
  }

  async upsertMany({ translates }: CreateTranslateDto) {
    for (const translate of translates) {
      await this.upsert(translate);
    }
    // todo use code from next line when connect postgresql
    // return Promise.all(translates.map((item) => this.upsert(item)));
  }

  async upsert(translateDto: TranslateDto) {
    const existing = await this.findOneByKey(
      translateDto.language,
      translateDto.key,
    );
    if (existing) {
      return this.update(existing.id, translateDto);
    }
    return this.create(translateDto);
  }

  async update(id: number, translateDto: TranslateDto) {
    return this.prismaService.translate.update({
      where: { id },
      data: translateDto,
    });
  }

  remove(id: number[]) {
    return this.prismaService.translate.deleteMany({
      where: { id: { in: id } },
    });
  }
}
