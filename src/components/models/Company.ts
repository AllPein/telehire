import { CompanyVolumeEnum } from '@/enums/Company';

export interface Company {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  volume: CompanyVolumeEnum;
}
