import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'nestjs-prisma';
import { GetAppliesDto } from 'src/applies/dto/get-applies.dto';
import { AppClsStore } from 'src/utils/types/cls.type';
import { MaybeType } from 'src/utils/types/maybe.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InvitesService {
  private readonly logger = new Logger(InvitesService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async create(createInviteDto: CreateInviteDto) {
    let resumeId: MaybeType<NullableType<number>> = createInviteDto.resumeId;
    if (!resumeId) {
      const data = await this.prisma.profile.findUnique({
        where: { id: this.cls.get('user.id') },
        select: { activeResumeId: true },
      });
      resumeId = data?.activeResumeId;
    }

    if (!resumeId) {
      throw new BadRequestException();
    }

    return this.prisma.invites.create({
      data: {
        resume: {
          connect: { id: resumeId },
        },
        vacancy: {
          connect: { id: createInviteDto.vacancyId },
        },
      },
    });
  }

  findAll(query: GetAppliesDto) {
    return this.prisma.invites.findMany({
      where: query,
    });
  }
}
