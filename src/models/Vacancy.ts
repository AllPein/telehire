import {
  CurrencyEnum,
  ExperienceEnum,
  JobTypeEnum,
  VacancyStatusEnum,
} from '@/enums/Vacancy';
import { Company } from '@/models/Company';

export type Vacancy = {
  requirements?: string;
  description?: string;
  authorId: string | null;
} & ShortVacancy;

export type ShortVacancy = {
  id: number;
  position: string;
  salaryFrom: number;
  skills: { id: string; name: string }[];
  salaryTo: number;
  currency: string;
  jobType: JobTypeEnum;
  status: VacancyStatusEnum | null;
  location: {
    country: string;
  };
  company: Company;
  experience: ExperienceEnum;
};

export const CurrencyToSymbol = {
  [CurrencyEnum.USD]: '$',
  [CurrencyEnum.RUB]: 'руб.',
};
