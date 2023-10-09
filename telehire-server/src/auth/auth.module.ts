import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppCaslFactory } from 'src/ability/ability.factory';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TwaStrategy } from './strategies/telegram.strategy';

@Global()
@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    TwaStrategy,
    JwtRefreshStrategy,
    {
      provide: AppCaslFactory,
      useClass: AppCaslFactory,
    },
  ],
  exports: [AuthService, AppCaslFactory],
})
export class AuthModule {}
