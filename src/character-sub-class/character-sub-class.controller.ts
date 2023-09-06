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
import { CharacterSubClassService } from './character-sub-class.service';
import { CreateCharacterSubClassDto } from './dto/create-character-sub-class.dto';
import { UpdateCharacterSubClassDto } from './dto/update-character-sub-class.dto';
import { CharacterSubClassEntity } from './entities/character-sub-class.entity';

@ApiTags('Character sub class')
@Controller('character-sub-class')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CharacterSubClassController {
  constructor(
    private readonly characterSubClassService: CharacterSubClassService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  @ApiOkResponse({ type: CharacterSubClassEntity })
  @ApiOperation({ summary: 'Available only for admins' })
  async create(@Body() createCharacterSubClassDto: CreateCharacterSubClassDto) {
    const characterSubClass = await this.characterSubClassService.create(
      createCharacterSubClassDto,
    );
    return new CharacterSubClassEntity(characterSubClass);
  }

  @Get()
  @ApiOkResponse({ type: CharacterSubClassEntity, isArray: true })
  async findAll() {
    const characterSubClasses = await this.characterSubClassService.findAll();
    return characterSubClasses.map((item) => new CharacterSubClassEntity(item));
  }

  @Get(':id')
  @ApiOkResponse({ type: CharacterSubClassEntity })
  async findOne(@Param('id') id: string) {
    const characterSubClass = await this.characterSubClassService.findOne(+id);
    return new CharacterSubClassEntity(characterSubClass);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  @ApiOkResponse({ type: CharacterSubClassEntity })
  @ApiOperation({ summary: 'Available only for admins' })
  async update(
    @Param('id') id: string,
    @Body() updateCharacterSubClassDto: UpdateCharacterSubClassDto,
  ) {
    const characterSubClass = await this.characterSubClassService.update(
      +id,
      updateCharacterSubClassDto,
    );
    return new CharacterSubClassEntity(characterSubClass);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Available only for admins' })
  async remove(@Param('id') id: string) {
    return this.characterSubClassService.remove(+id);
  }
}
