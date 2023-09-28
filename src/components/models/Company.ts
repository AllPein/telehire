import { CompanyVolumeEnum } from '@/enums/Company';

export type Company = {
  id: string;
  name: string;
  description: string;
  photo_url: string;
  volume: CompanyVolumeEnum;
};
