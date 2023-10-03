import { Option } from '@/types/Select';

export type VacancyFormData = {
  position: string;
  salaryFrom: string;
  salaryTo: string;
  country: Option;
  requirements: string;
  jobType: Option;
  experience: Option;
  skills: Option[];
  currency: Option;
};

export type ResumeFormData = {
  position: string;
  salary: string;
  description: string;
  skills: Option[];
  currency: Option;
};

export type CompanyFormData = {
  photoUrl: string;
  name: string;
  description: string;
  volume: Option;
};
