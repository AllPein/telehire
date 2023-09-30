import { CurrencyEnum } from '@/enums/Vacancy';

export type Resume = {
  id: number;
  position: string;
  createdAt?: string;
  salary: number;
  description: string;
  currency: CurrencyEnum;
  skills: string[];
};
