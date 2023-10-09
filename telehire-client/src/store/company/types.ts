import { CompanyVolumeEnum } from '@/enums/Company';

export type CreateCompanyDto = {
  photoUrl: string;
  name: string;
  description: string;
  volume: CompanyVolumeEnum;
};
