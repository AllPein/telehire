import { IsInt, IsNotEmpty } from 'class-validator';

export class SetActiveResumeDto {
  @IsNotEmpty()
  @IsInt()
  resumeId: number;
}
