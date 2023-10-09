import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class TelegramAuthDataDto {
  @ApiProperty({ example: 446748862 })
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  id: number;

  @ApiProperty({ example: 'Andrei' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  firstName?: string;

  @ApiProperty({ example: 'Nebogatikov' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  lastName?: string;

  @ApiProperty({ example: 'andronax' })
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  username?: string;
}
