import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import { RedisOptions } from 'ioredis';
import { AllConfigType } from 'src/config/config.type';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync<RedisOptions>({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        store: redisStore,
        host: configService.get('redis.host', { infer: true }),
        port: configService.get('redis.port', { infer: true }),
        password: configService.get('redis.password', { infer: true }),
        keyPrefix: 'CACHE_KEY',
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
