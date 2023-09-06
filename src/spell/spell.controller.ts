import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { SpellEntity } from './entities/spell.entity';
import { SpellService } from './spell.service';
import { CreateSpellDto } from './dto/create-spell.dto';
import { UpdateSpellDto } from './dto/update-spell.dto';

@ApiTags('Spell')
@Controller('spell')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SpellController {
  constructor(private readonly spellService: SpellService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOkResponse({ type: SpellEntity })
  @ApiOperation({ summary: 'Available only for admins' })
  async create(@Body() createSpellDto: CreateSpellDto) {
    const spell = await this.spellService.create(createSpellDto);
    return new SpellEntity(spell);
  }

  @Get()
  @ApiOkResponse({ type: SpellEntity, isArray: true })
  async findAll() {
    const spells = await this.spellService.findAll();
    return spells.map((item) => new SpellEntity(item));
  }

  @Get(':id')
  @ApiOkResponse({ type: SpellEntity })
  async findOne(@Param('id') id: string) {
    const spell = await this.spellService.findOne(+id);
    return new SpellEntity(spell);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOkResponse({ type: SpellEntity })
  @ApiOperation({ summary: 'Available only for admins' })
  async update(
    @Param('id') id: string,
    @Body() updateSpellDto: UpdateSpellDto,
  ) {
    const spell = await this.spellService.update(+id, updateSpellDto);
    return new SpellEntity(spell);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Available only for admins' })
  async remove(@Param('id') id: string) {
    return this.spellService.remove(+id);
  }
}
