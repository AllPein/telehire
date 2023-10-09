import { Module } from '@nestjs/common';
import { AppUpdate } from './bot.update';
import { BotController } from './bot.controller';

@Module({
  imports: [],
  providers: [AppUpdate],
  controllers: [BotController],
})
export class BotModule {}
