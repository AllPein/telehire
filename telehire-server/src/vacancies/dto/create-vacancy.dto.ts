import { ApiProperty } from '@nestjs/swagger';
import { Experience, JobType } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Location } from 'src/companies/entities/location.entity';

export class CreateVacancyDto {
  @ApiProperty()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsNotEmpty()
  salaryFrom: number;

  @IsOptional()
  salaryTo?: number;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  jobType: JobType;

  /**
   * @example "Senior"
   */
  @IsNotEmpty()
  experience: Experience;

  @IsNotEmpty()
  companyId: number;

  @IsOptional()
  requirements?: string;

  @IsNotEmpty()
  skills: string[] = [];

  @ApiProperty({
    type: Location,
  })
  @IsOptional()
  location?: Location;
}
