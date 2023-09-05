import { Module } from '@nestjs/common';
import { CharacterSubClassService } from './character-sub-class.service';
import { CharacterSubClassController } from './character-sub-class.controller';

@Module({
  controllers: [CharacterSubClassController],
  providers: [CharacterSubClassService]
})
export class CharacterSubClassModule {}
