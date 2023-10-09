import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ClsModule } from 'nestjs-cls';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { TelegrafModule } from 'nestjs-telegraf';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AppliesModule } from './applies/applies.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import { AllConfigType } from './config/config.type';
import databaseConfig from './config/database.config';
import lightcastConfig from './config/lightcast.config';
import redisConfig from './config/redis.config';
import telegramConfig from './config/telegram.config';
import { FeedModule } from './feed/feed.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { HomeModule } from './home/home.module';
import { InvitesModule } from './invites/invites.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ResumesModule } from './resumes/resumes.module';
import { SkillsModule } from './skills/skills.module';
import { BOT_SERVICE_TOKEN } from './telegraf/bot.constants';
import { BotModule } from './telegraf/bot.module';
import { VacanciesModule } from './vacancies/vacancies.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        telegramConfig,
        redisConfig,
        lightcastConfig,
      ],
      envFilePath: ['.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),

    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: BOT_SERVICE_TOKEN,
          useFactory: (config: ConfigService<AllConfigType>) => ({
            transport: Transport.REDIS,
            options: {
              host: config.get('redis.host', { infer: true }),
              port: config.get('redis.port', { infer: true }),
              password: config.get('redis.password', { infer: true }),
            },
          }),
          imports: [ConfigModule],
          inject: [ConfigService],
        },
      ],
    }),
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        token: configService.getOrThrow('telegram.token', { infer: true }),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    BotModule,
    AuthModule,
    HomeModule,
    CompaniesModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => req.headers['X-Request-Id'] ?? uuidv4(),
      },
      interceptor: {
        mount: true,
        setup: (cls, context) => {
          const req = context.switchToHttp().getRequest<Request>();

          //@ts-ignore
          cls.set('user', req.user);
        },
      },
    }),

    VacanciesModule,
    ResumesModule,
    FeedModule,
    AppliesModule,
    SkillsModule,
    InvitesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
