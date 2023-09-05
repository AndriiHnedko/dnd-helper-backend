import { PartialType } from '@nestjs/swagger';
import { CreateCharacterClassDto } from './create-character-class.dto';

export class UpdateCharacterClassDto extends PartialType(CreateCharacterClassDto) {}
