import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User, initData, validate } from '@twa.js/init-data-node';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { AllConfigType } from 'src/config/config.type';
import { OrNeverType } from '../../utils/types/or-never.type';

@Injectable()
export class TwaStrategy extends PassportStrategy(Strategy, 'twa') {
  constructor(private configService: ConfigService<AllConfigType>) {
    super();
  }

  public async validate(request: Request): Promise<OrNeverType<User>> {
    const payload = request.headers.authorization;

    if (payload === undefined) {
      throw new UnauthorizedException();
    }

    try {
      await validate(
        payload,
        this.configService.getOrThrow('telegram.token', { infer: true }),
      );
    } catch (e) {
      throw new UnauthorizedException();
    }
    const data = initData.parse(payload);

    if (data.user === undefined) {
      throw new UnauthorizedException();
    }
    return data.user;
  }
}
