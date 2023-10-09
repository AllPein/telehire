import { Volume } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  photoUrl?: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  volume: Volume = Volume.SelfEmployed;
}
