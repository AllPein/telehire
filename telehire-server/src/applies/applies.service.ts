import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApplyStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { timeout } from 'rxjs';
import { BOT_SERVICE_TOKEN } from 'src/telegraf/bot.constants';
import { SEND_MESSAGE } from 'src/telegraf/bot.messages';
import { TelegramMessage } from 'src/telegraf/interfaces/telegram-message.interface';
import { CreateApplyDto } from './dto/create-apply.dto';
import { GetAppliesDto } from './dto/get-applies.dto';

@Injectable()
export class AppliesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(BOT_SERVICE_TOKEN) private readonly client: ClientProxy,
  ) {}

  async create(createApplyDto: CreateApplyDto) {
    const vacancy = await this.prisma.vacancy.findUnique({
      where: {
        id: createApplyDto.vacancyId,
      },
      select: {
        author: {
          select: {
            telegramId: true,
          },
        },
      },
    });

    const apply = await this.prisma.applies.create({
      data: {
        status: ApplyStatus.Pending,
        resume: {
          connect: {
            id: createApplyDto.resumeId,
          },
        },
        vacancy: {
          connect: {
            id: createApplyDto.vacancyId,
          },
        },
      },
    });
    if (vacancy?.author.telegramId !== undefined)
      this.client
        .emit<string, TelegramMessage>(SEND_MESSAGE, {
          to: vacancy.author.telegramId,
          text: 'New request on your vacancy',
          options: {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Accept',
                    callback_data: `apply/${apply.id}/${ApplyStatus.Accepted}`,
                  },
                  {
                    text: 'Reject',
                    callback_data: `apply/${apply.id}/${ApplyStatus.Denied}`,
                  },
                ],
                [
                  {
                    text: 'View Candidate',
                    web_app: {
                      url: 'https://busy-jobs-reply.loca.lt',
                    },
                  },
                ],
              ],
            },
          },
        })
        .pipe(timeout(2000));

    return apply;
  }

  findAll(query: GetAppliesDto) {
    return this.prisma.applies.findMany({
      where: query,
      include: {
        resume: true,
        vacancy: {
          include: {
            company: true,
            location: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} apply`;
  }

  update(id: number) {
    return `This action updates a #${id} apply`;
  }

  remove(id: number) {
    return `This action removes a #${id} apply`;
  }
}
