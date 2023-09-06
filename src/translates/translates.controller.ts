import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { DeleteTranslateDto } from './dto/delete-translate.dto';
import { TranslatesService } from './translates.service';

@ApiTags('Translates')
@Controller('translates')
export class TranslatesController {
  constructor(private readonly translatesService: TranslatesService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Available only for admins' })
  create(@Body() createTranslateDto: CreateTranslateDto) {
    return this.translatesService.upsertMany(createTranslateDto);
  }

  @Get('languages')
  @ApiOperation({ description: 'Return array of available translates' })
  findAvailableLanguages() {
    return this.translatesService.findAvailableLanguages();
  }

  @Get(':language')
  @ApiOperation({ description: 'Return translates for selected language' })
  findAllByLanguage(@Param('language') language: string) {
    return this.translatesService.findAllByLanguage(language);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @Delete()
  @ApiOperation({ summary: 'Available only for admins' })
  remove(@Body() deleteTranslateDto: DeleteTranslateDto) {
    return this.translatesService.remove(deleteTranslateDto.ids);
  }
}
