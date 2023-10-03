import { CompanyVolumeEnum } from '@/enums/Company';
import { User } from '@/models/User';
import { ShortVacancy } from '@/models/Vacancy';

export type Company = {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  ownerId: number;
  members: User[];
  volume: CompanyVolumeEnum;
  vacancies: ShortVacancy[];
};
