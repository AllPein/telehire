import { Test, TestingModule } from '@nestjs/testing';
import { AppliesController } from './applies.controller';
import { AppliesService } from './applies.service';

describe('AppliesController', () => {
  let controller: AppliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppliesController],
      providers: [AppliesService],
    }).compile();

    controller = module.get<AppliesController>(AppliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
