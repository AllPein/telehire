import { Company } from '@/models/Company';
import { Resume } from '@/models/Resume';

export type TelegramUser = {
  id: number;
  isBot?: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  addedToAttachmentMenu?: boolean;
  allowsWriteToPm?: boolean;
  photoUrl?: string;
};

export type User = {
  companyList?: Company[] | null;
  activeResumeId?: number;
  resumes?: Resume[] | null;
  loggedInAs?: 'applicant' | 'company' | null;
} & TelegramUser;

export type Token = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user?: User;
};
