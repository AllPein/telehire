import { CurrencyEnum } from '@/enums/Vacancy';

export type CV = {
  id: number;
  position: string;
  createdAt?: string;
  salary: number;
  description: string;
  currency: CurrencyEnum;
  skills: string[];
};
