import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';
import { Profile } from '@prisma/client';
import { NullableType } from 'src/utils/types/nullable.type';
import { AuthService } from './auth.service';
import { LoginResponse } from './types/login-response.type';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Get('login')
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'x-twa-init-data',
    required: true,
    example:
      'query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A446748862%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2',
  })
  @ApiCreatedResponse({
    type: LoginResponse,
  })
  public login(
    @Headers('x-twa-init-data') login: string,
  ): Promise<LoginResponse> {
    return this.service.validateLogin(login);
  }

  @ApiBearerAuth()
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(): Promise<NullableType<Profile>> {
    return this.service.me();
  }
}
