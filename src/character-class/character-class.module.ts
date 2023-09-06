import { Module } from '@nestjs/common';
import { CharacterClassService } from './character-class.service';
import { CharacterClassController } from './character-class.controller';

@Module({
  controllers: [CharacterClassController],
  providers: [CharacterClassService],
})
export class CharacterClassModule {}
