import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  description: string;

  /**
   * desired salary
   *
   * @example 5000
   */
  @IsOptional()
  salary?: number;

  /**
   * ISO 4217 currency code
   * example USD
   */
  @IsOptional()
  currency?: string;

  @IsNotEmpty()
  position: string;

  /**
   * @example ['NodeJS', 'React']
   */
  @IsNotEmpty()
  @IsArray()
  skills: string[] = [];
}
