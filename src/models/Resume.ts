import { CurrencyEnum } from '@/enums/Vacancy';
import { User } from '@/models/User';

export type Resume = {
  id: number;
  position: string;
  createdAt?: string;
  salary: number;
  description: string;
  user: User;
  currency: CurrencyEnum;
  skills: string[];
};
