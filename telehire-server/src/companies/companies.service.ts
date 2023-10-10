import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Company, CompanyLink } from '@prisma/client';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'nestjs-prisma';
import { AppAbility } from 'src/ability/ability.factory';
import { BOT_SERVICE_TOKEN } from 'src/telegraf/bot.constants';
import { SEND_MESSAGE } from 'src/telegraf/bot.messages';
import { TelegramMessage } from 'src/telegraf/interfaces/telegram-message.interface';
import { AppClsStore } from 'src/utils/types/cls.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cls: ClsService<AppClsStore>,
    @Inject(BOT_SERVICE_TOKEN) private readonly client: ClientProxy,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const userId = this.cls.get('user.id');
    const data = await this.prisma.company.create({
      data: {
        ...createCompanyDto,
        ownerId: userId,
        members: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        vacancies: true,
      },
    });

    return data;
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: { members: true, vacancies: true },
    });
  }

  async acceptInvite(hash: string) {
    const id = this.cls.get('user.id');
    const link = await this.prisma.companyLink.findUnique({
      where: {
        hash,
      },
    });

    return this.prisma.company.update({
      where: {
        id: link?.companyId,
      },
      data: {
        members: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async findMyCompanies(): Promise<Company[]> {
    const id = this.cls.get('user.id');
    return this.prisma.company.findMany({
      where: {
        members: { some: { id } },
      },
      include: {
        vacancies: true,
      },
    });
  }

  async findOne(
    id: Company['id'],
    ability: AppAbility,
  ): Promise<NullableType<Company>> {
    const userId = this.cls.get('user.id');

    return await this.prisma.company.findUnique({
      where: { id },
      include: {
        members: ability.can('update', 'Company'),
        link: ability.can('update', 'Company'),
        vacancies: {
          where: {
            author: {
              id: userId,
            },
          },
          include: {
            location: true,
          },
        },
      },
    });
  }

  async createLink(data: CreateLinkDto) {
    const hash = generateString(10).trim();

    const company = await this.prisma.company.findUnique({
      where: { id: data.companyId },
    });

    let link;

    try {
      link = await this.prisma.companyLink.create({
        data: {
          company: {
            connect: {
              id: data.companyId,
            },
          },
          hash: hash,
        },
      });
    } catch (e) {
      link = await this.prisma.companyLink.findFirst({
        where: {
          company: {
            id: data.companyId,
          },
        },
      });
    }
    this.client.emit<string, TelegramMessage>(SEND_MESSAGE, {
      to: this.cls.get('user.telegramId'),
      text: `Your invitation link for company ${company?.name}`,
      options: {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Invite',
                switch_inline_query: `Join ${company?.name} at https://t.me/intouche_bot/telehire?startapp=company${link.hash}`,
              },
            ],
          ],
        },
      },
    });

    return link;
  }
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
