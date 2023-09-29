import { CompanyVolumeEnum } from '@/enums/Company';
import { ShortVacancy } from '@/models/Vacancy';

export type Company = {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  volume: CompanyVolumeEnum;
  vacancies: ShortVacancy[];
};
