import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, RpcException } from '@nestjs/microservices';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/utils/types/telegraf.type';
import { Telegraf } from 'telegraf';
import { SEND_MESSAGE } from './bot.messages';
import { TelegramMessage } from './interfaces/telegram-message.interface';

@Controller()
export class BotController {
  private readonly logger = new Logger(BotController.name);

  constructor(@InjectBot() private readonly bot: Telegraf<TelegrafContext>) {}

  @EventPattern(SEND_MESSAGE)
  async onCompanyCreated(@Payload() payload: TelegramMessage) {
    try {
      this.bot.telegram.sendMessage(payload.to, payload.text, payload.options);
      this.logger.log('message sent');
    } catch (e) {
      this.logger.log('error occurred');
      throw new RpcException(e);
    }
  }
}
