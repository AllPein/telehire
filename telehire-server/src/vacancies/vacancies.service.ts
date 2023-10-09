import { Injectable, Logger } from '@nestjs/common';
import { ApplyStatus } from '@prisma/client';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'nestjs-prisma';
import { AppClsStore } from 'src/utils/types/cls.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateVacancyDto } from './dto/create-vacancy.dto';

@Injectable()
export class VacanciesService {
  private readonly logger = new Logger(VacanciesService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  create(createVacancyDto: CreateVacancyDto) {
    this.logger.log(this.cls.get('user'));
    return this.prisma.vacancy.create({
      data: {
        ...createVacancyDto,
        companyId: undefined,

        location: {
          connectOrCreate: {
            where: {
              country: createVacancyDto.location?.country,
              city: createVacancyDto.location?.city,
            },
            create: {
              country: createVacancyDto.location?.country || '',
              city: createVacancyDto.location?.city,
            },
          },
        },
        author: {
          connect: {
            id: this.cls.get('user.id'),
          },
        },
        company: {
          connect: {
            id: createVacancyDto.companyId,
          },
        },
        skills: {
          connectOrCreate: createVacancyDto.skills.map((skill) => ({
            where: {
              name: skill,
            },
            create: {
              name: skill,
            },
          })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.vacancy.findMany({
      include: { company: true, skills: true, location: true },
    });
  }

  async findOne(id: number) {
    const userId = this.cls.get('user.id');
    const vacancy = await this.prisma.vacancy.findUnique({
      where: { id },
      include: { company: true, location: true, skills: true },
    });
    const applies = await this.prisma.applies.findMany({
      where: {
        vacancy: {
          id,
          profileId: userId,
        },
      },
      include: {
        resume: {
          include: {
            user: true,
          },
        },
      },
    });
    // TODO(Andrei Nebogatikov): must be only one apply per user
    const status = applies[0]?.status;

    let authorId: NullableType<string> = null;

    if (status === ApplyStatus.Accepted) {
      authorId = applies[0].resume.user.username;
    }

    return {
      ...vacancy,
      status: status || null,
      authorId,
    };
  }
}
