import { PartialType } from '@nestjs/swagger';
import { CreateCharacterSubClassDto } from './create-character-sub-class.dto';

export class UpdateCharacterSubClassDto extends PartialType(CreateCharacterSubClassDto) {}
