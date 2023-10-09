import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';

export interface TelegramMessage {
  to: number;
  text: string;
  options?: ExtraReplyMessage;
}
