import { Volume } from '@prisma/client';

export class CompanyEntity {
  id: number;
  ownerId: number;
  name: string;
  photoUrl?: string;
  description: string;
  volume: Volume;
  createdAt: Date;
  updatedAt: Date;
}
