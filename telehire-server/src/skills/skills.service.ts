import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import snakecaseKeys from 'snakecase-keys';
import { AllConfigType } from 'src/config/config.type';
import { LightcastSkill } from './entities/skill.entity';
import { LIGHTCAST_CACHE_KEY } from './skills.constants';

@Injectable()
export class SkillsService {
  private readonly logger = new Logger(SkillsService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AllConfigType>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOne(q?: string) {
    let token = await this.cacheManager.get<string>(LIGHTCAST_CACHE_KEY);

    if (!token) {
      this.logger.log('No token found in cache, fetching from lightcast');
      token = await this.getLightcastAuth();
      await this.cacheManager.set(LIGHTCAST_CACHE_KEY, token, 1000 * 3600);
    }
    const response = await firstValueFrom(
      this.httpService.get<{ data: LightcastSkill[] }>(
        `https://emsiservices.com/skills/versions/latest/skills?${
          q ? 'q=${q}&' : ''
        }fields=name&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );
    return response.data.data;
  }

  private async getLightcastAuth() {
    const lightcastConfig = this.configService.getOrThrow('lightcast', {
      infer: true,
    });
    const data = await firstValueFrom(
      this.httpService.post<{ access_token: string }>(
        'https://auth.emsicloud.com/connect/token',
        snakecaseKeys(lightcastConfig),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      ),
    );

    return data.data.access_token;
  }
}
