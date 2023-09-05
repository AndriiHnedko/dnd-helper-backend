import { Test, TestingModule } from '@nestjs/testing';
import { CharacterSubClassController } from './character-sub-class.controller';
import { CharacterSubClassService } from './character-sub-class.service';

describe('CharacterSubClassController', () => {
  let controller: CharacterSubClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterSubClassController],
      providers: [CharacterSubClassService],
    }).compile();

    controller = module.get<CharacterSubClassController>(CharacterSubClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
