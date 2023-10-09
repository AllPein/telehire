import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateInviteDto {
  @IsNotEmpty()
  @IsInt()
  vacancyId: number;

  @IsNotEmpty()
  @IsOptional()
  @IsInt()
  resumeId?: number;
}
