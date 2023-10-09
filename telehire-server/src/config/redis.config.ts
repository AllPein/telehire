import { registerAs } from '@nestjs/config';
import { RedisConfig } from './config.type';
import { IsInt, IsOptional, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  REDIS_HOST: string;

  @IsString()
  @IsOptional()
  REDIS_USER: string;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string;

  @IsInt()
  @IsOptional()
  REDIS_PORT: number;
}

export default registerAs<RedisConfig>('redis', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    host: process.env.REDIS_HOST,
    user: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 3000,
  };
});
