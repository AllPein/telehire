import { Company } from '@/models/Company';
import { Resume } from '@/models/Resume';

export type TelegramUser = {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
};

export type User = {
  companyList?: Company[] | null;
  currentResumeId?: number;
  resumes?: Resume[] | null;
  loggedInAs?: 'applicant' | 'company' | null;
} & TelegramUser;

export type Token = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user?: User;
};
