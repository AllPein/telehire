import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsInt()
  companyId: number;
}
