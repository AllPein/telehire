import { IsInt, IsNotEmpty, ValidateIf } from 'class-validator';

export class GetAppliesDto {
  @ValidateIf((o) => !o.vacancyId)
  @IsNotEmpty()
  @IsInt()
  resumeId?: number;

  @ValidateIf((o) => !o.resumeId)
  @IsNotEmpty()
  @IsInt()
  vacancyId?: number;
}
