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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.decorator';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterEntity } from './entities/character.entity';

@ApiTags('Characters')
@Controller('characters')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiOkResponse({ type: CharacterEntity })
  async create(@User() user, @Body() createCharacterDto: CreateCharacterDto) {
    const character = await this.charactersService.create(
      user.id,
      createCharacterDto,
    );
    return new CharacterEntity(character);
  }

  @Get()
  @ApiOkResponse({ type: CharacterEntity, isArray: true })
  async findAll(@User() user) {
    const characters = await this.charactersService.findAll(user.id);
    return characters.map((character) => new CharacterEntity(character));
  }

  @Get(':id')
  @ApiOkResponse({ type: CharacterEntity })
  async findOne(@User() user, @Param('id') id: string) {
    const character = await this.charactersService.findOneOrThrow(user.id, +id);
    return new CharacterEntity(character);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CharacterEntity })
  async update(
    @User() user,
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    const character = await this.charactersService.update(
      user.id,
      +id,
      updateCharacterDto,
    );
    return new CharacterEntity(character);
  }

  @Delete(':id')
  async remove(@User() user, @Param('id') id: string) {
    return this.charactersService.remove(user.id, +id);
  }
}
