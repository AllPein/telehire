import { CurrencyEnum, ExperienceEnum, JobTypeEnum } from '@/enums/Vacancy';

export type CreateVacancyRequestDto = {
  position: string;
  salaryFrom: number;
  salaryTo?: number;
  currency: CurrencyEnum;
  jobType: JobTypeEnum;
  location: {
    country: string;
  };
  experience: ExperienceEnum;
  companyId: number;
  requirements: string;
  skills: string[];
};
