import { IsInt, IsNotEmpty } from 'class-validator';
export class CreateApplyDto {
  @IsNotEmpty()
  @IsInt()
  vacancyId: number;

  @IsNotEmpty()
  @IsInt()
  resumeId: number;
}
