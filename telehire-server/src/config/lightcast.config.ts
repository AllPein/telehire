import { registerAs } from '@nestjs/config';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
import { LightcastConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  LIGHTCAST_CLIENT_ID: string;

  @IsString()
  @IsOptional()
  LIGHTCAST_CLIENT_SECRET: string;

  @IsString()
  @IsOptional()
  LIGHTCAST_GRANT_TYPE: string;

  @IsString()
  @IsOptional()
  LIGHTCAST_SCOPE: string;
}

export default registerAs<LightcastConfig>('lightcast', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    clientId: process.env.LIGHTCAST_CLIENT_ID,
    clientSecret: process.env.LIGHTCAST_CLIENT_SECRET,
    grantType: process.env.LIGHTCAST_GRANT_TYPE,
    scope: process.env.LIGHTCAST_SCOPE,
  };
});
