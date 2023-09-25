import { ExperienceEnum } from '@/enums/Vacancy';

export type Vacancy = {
  title: string;
  salary: string;
  country: string;
  city: string;
  company: string;
  experience: ExperienceEnum;
};
