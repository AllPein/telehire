import { CurrencyEnum, ExperienceEnum } from '@/enums/Vacancy';
import { Company } from '@/models/Company';

export type Vacancy = {
  requirements?: string;
  description?: string;
} & ShortVacancy;

export type ShortVacancy = {
  id: number;
  position: string;
  salaryFrom: number;
  skills: { id: string; name: string }[];
  salaryTo: number;
  currency: string;
  jobType: 'Remote' | 'Office' | 'Hybrid';
  location: {
    country: string;
    city: string;
  };
  company: Company;
  experience: ExperienceEnum;
};

export const CurrencyToSymbol = {
  [CurrencyEnum.USD]: '$',
  [CurrencyEnum.RUB]: 'руб.',
};
