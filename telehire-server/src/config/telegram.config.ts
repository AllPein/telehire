import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { TelegramConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  TELEGRAM_BOT_TOKEN: string;
}

export default registerAs<TelegramConfig>('telegram', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    token: process.env.TELEGRAM_BOT_TOKEN,
  };
});
