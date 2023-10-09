import { ApplyStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import {
  Action,
  Ctx,
  Hears,
  Help,
  On,
  Start,
  Update as TeleUpdate,
} from 'nestjs-telegraf';
import { TelegrafContext } from 'src/utils/types/telegraf.type';

@TeleUpdate()
export class AppUpdate {
  constructor(private readonly prisma: PrismaService) {}

  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Hey there');
  }

  @Action(/apply*/)
  async onApplyReplied(@Ctx() ctx: TelegrafContext) {
    if ('data' in ctx.callbackQuery!) {
      try {
        const [_, applyId, status] = ctx.callbackQuery.data.split('/');
        await this.prisma.applies.update({
          where: {
            id: parseInt(applyId),
          },
          data: {
            status: status as ApplyStatus,
          },
        });
        await ctx.answerCbQuery('Success!', {
          show_alert: true,
        });
        return;
      } catch (e) {
        await ctx.answerCbQuery('Oops', {
          show_alert: true,
        });
      }
    }
  }

  @Action(/companyInvite*/)
  async acceptInvite(@Ctx() ctx: TelegrafContext) {
    if ('data' in ctx.callbackQuery!) {
      try {
        const [_s, hash] = ctx.callbackQuery.data.split('/');
        const from = ctx.from?.id;
        const company = await this.prisma.companyLink.findUnique({
          where: {
            hash,
          },
          select: {
            companyId: true,
          },
        });
        if (!company) {
          return ctx.answerCbQuery('No such company');
        }
        await this.prisma.company.update({
          where: { id: company.companyId },
          data: {
            members: {
              connect: {
                telegramId: from,
              },
            },
          },
        });
        ctx.answerCbQuery('You are now member of this company');
      } catch (e) {
        return ctx.answerCbQuery('OOps');
      }
    }
  }
}
