import { CompanyVolumeEnum } from '@/enums/Company';

export interface Company {
  id: string;
  name: string;
  description: string;
  volume: CompanyVolumeEnum;
}
