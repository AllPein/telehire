import { Company } from '@/components/models/Company';

export type TelegramUser = {
  id: string;
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
  loggedInAs?: 'applicant' | 'company' | null;
} & TelegramUser;
