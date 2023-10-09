import { Test, TestingModule } from '@nestjs/testing';
import { AppliesService } from './applies.service';

describe('AppliesService', () => {
  let service: AppliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppliesService],
    }).compile();

    service = module.get<AppliesService>(AppliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
