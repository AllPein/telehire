import { Injectable, Logger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'nestjs-prisma';
import { AppClsStore } from 'src/utils/types/cls.type';
import { CreateResumeDto } from './dto/create-resume.dto';
import { SetActiveResumeDto } from './dto/set-active-resume.dto';

@Injectable()
export class ResumesService {
  private readonly logger = new Logger(ResumesService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async create(createResumeDto: CreateResumeDto) {
    const id = this.cls.get('user.id');

    const resumesCount = await this.prisma.resume.count({
      where: {
        user: {
          id,
        },
      },
    });

    const data = await this.prisma.resume.create({
      data: {
        ...createResumeDto,
        user: {
          connect: {
            id,
          },
        },

        skills: {
          connectOrCreate: createResumeDto.skills.map((e) => ({
            where: {
              name: e,
            },
            create: {
              name: e,
            },
          })),
        },
      },
    });
    if (!resumesCount) {
      await this.prisma.profile.update({
        where: {
          id,
        },
        data: {
          activeResumeId: data.id,
        },
      });
    }
    return data;
  }

  async findAll() {
    return this.prisma.resume.findMany({
      include: { skills: true, user: true, applies: true },
    });
  }

  async my() {
    const id = this.cls.get('user.id');
    this.logger.log(id);
    return this.prisma.resume.findMany({
      where: {
        user: {
          id,
        },
      },
      orderBy: {
        views: 'desc',
      },
      include: { skills: true },
    });
  }

  async findOne(id: number, type: string) {
    const data = await this.prisma.resume.findUnique({
      where: {
        id,
      },
      include: { applies: true, user: true },
    });

    if (data !== null && this.cls.get('user.id') != data.user.id) {
      await this.prisma.resume.update({
        where: {
          id: data.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }
    return data;
  }

  async setActive({ resumeId }: SetActiveResumeDto) {
    const id = this.cls.get('user.id');
    return this.prisma.profile.update({
      where: {
        id,
      },
      data: {
        activeResumeId: resumeId,
      },
    });
  }
}
