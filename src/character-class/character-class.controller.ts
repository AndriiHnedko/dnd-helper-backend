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
import { CharacterClassService } from './character-class.service';
import { CreateCharacterClassDto } from './dto/create-character-class.dto';
import { UpdateCharacterClassDto } from './dto/update-character-class.dto';
import { CharacterClassEntity } from './entities/character-class.entity';

@ApiTags('Character class')
@Controller('character-class')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CharacterClassController {
  constructor(private readonly characterClassService: CharacterClassService) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOkResponse({ type: CharacterClassEntity })
  @ApiOperation({ summary: 'Available only for admins' })
  async create(@Body() createCharacterClassDto: CreateCharacterClassDto) {
    const characterClass = await this.characterClassService.create(
      createCharacterClassDto,
    );
    return new CharacterClassEntity(characterClass);
  }

  @Get()
  @ApiOkResponse({ type: CharacterClassEntity, isArray: true })
  async findAll() {
    const characterClass = await this.characterClassService.findAll();
    return characterClass.map((item) => new CharacterClassEntity(item));
  }

  @Get(':id')
  @ApiOkResponse({ type: CharacterClassEntity })
  async findOne(@Param('id') id: string) {
    const characterClass = await this.characterClassService.findOne(+id);
    return new CharacterClassEntity(characterClass);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOkResponse({ type: CharacterClassEntity })
  @ApiOperation({ summary: 'Available only for admins' })
  async update(
    @Param('id') id: string,
    @Body() updateCharacterClassDto: UpdateCharacterClassDto,
  ) {
    const characterClass = await this.characterClassService.update(
      +id,
      updateCharacterClassDto,
    );
    return new CharacterClassEntity(characterClass);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Available only for admins' })
  async remove(@Param('id') id: string) {
    return this.characterClassService.remove(+id);
  }
}
