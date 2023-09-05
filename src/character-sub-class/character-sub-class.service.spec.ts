import { Test, TestingModule } from '@nestjs/testing';
import { CharacterSubClassService } from './character-sub-class.service';

describe('CharacterSubClassService', () => {
  let service: CharacterSubClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterSubClassService],
    }).compile();

    service = module.get<CharacterSubClassService>(CharacterSubClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
