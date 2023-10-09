import { Test, TestingModule } from '@nestjs/testing';
import { Company, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule.forRoot({ isGlobal: true })],
      providers: [PrismaService, CompaniesService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(CompaniesService);
    prisma = module.get(PrismaService);
  });

  it('create company', () => {
    const company: Company = {
      id: 1,
      name: 'test',
      volume: 'Low',
      description: 'test',
      photoUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 1,
    };

    prisma.company.create.mockResolvedValue(company);

    expect(
      service.create({
        name: 'test',
        volume: 'Low',
        description: 'test',
        photoUrl: undefined,
      }),
    ).resolves.toBe(company);
  });
});
