import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from '@prisma/client';
import { initData, validate } from '@twa.js/init-data-node';
import ms from 'ms';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'nestjs-prisma';
import { AllConfigType } from 'src/config/config.type';
import { AppClsStore } from 'src/utils/types/cls.type';
import { NullableType } from '../utils/types/nullable.type';
import { LoginResponse } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
    private readonly cls: ClsService<AppClsStore>,
  ) {}

  async validateLogin(initDataString: string): Promise<LoginResponse> {
    try {
      this.configService.get('app.nodeEnv', { infer: true }) !==
        'development' &&
        validate(
          initDataString,
          this.configService.getOrThrow('telegram.token', { infer: true }),
          {
            expiresIn: this.configService.getOrThrow('auth.expires', {
              infer: true,
            }),
          },
        );
    } catch (e) {
      throw new UnauthorizedException('init data can not be validated');
    }
    const data = initData.parse(initDataString);

    if (data.user === undefined) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.profile.upsert({
      where: {
        telegramId: data.user?.id,
      },
      create: {
        ...data.user,
        telegramId: data.user?.id,
        id: undefined,
      },
      update: { ...data.user, id: undefined },
    });

    const { token, tokenExpires } = await this.getTokensData({
      id: user.id,
      telegramId: data.user!.id,
    });

    return {
      token,
      tokenExpires,
    };
  }

  async me(): Promise<NullableType<Profile>> {
    const id = this.cls.get('user.id');
    return this.prisma.profile.findUnique({
      where: { id },
    });
  }

  private async getTokensData(data: {
    id: Profile['telegramId'];
    telegramId: Profile['telegramId'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const token = await this.jwtService.signAsync(
      {
        id: data.id,
        telegramId: data.telegramId,
      },
      {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpiresIn,
      },
    );

    return {
      token,
      tokenExpires,
    };
  }
}
