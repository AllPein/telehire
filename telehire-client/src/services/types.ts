import { Company } from '@/models/Company';
import { Resume } from '@/models/Resume';

import { Token, User } from '@/models/User';
import { ShortVacancy, Vacancy } from '@/models/Vacancy';
import { CreateCompanyDto } from '@/store/company/types';
import { CountriesDto } from '@/store/dictionary/types';
import { CreateResumeDto } from '@/store/resume/types';
import { CreateVacancyRequestDto } from '@/store/vacancy/types';
import {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

export interface IApiService {
  init: (axiosClient: AxiosClient) => void;
  getToken: (data: string) => Promise<Token>;
  getUser: () => Promise<User>;
  getApplies: (resumeId: number) => Promise<any[]>;
  getCompanies: () => Promise<Company[]>;
  getCompany: (id: number) => Promise<Company>;
  generateLink: (id: number) => Promise<string>;
  acceptInvite: (hash: string) => Promise<number | null>;
  getVacancies: (id: number | undefined) => Promise<ShortVacancy[]>;
  getCandidates: (id: number | undefined) => Promise<Resume[]>;
  getVacancy: (id: number) => Promise<Vacancy>;
  getDictionary: (key: string, payload?: any) => Promise<CountriesDto[]>;
  getResumes: () => Promise<Resume[]>;
  getMyResumes: () => Promise<Resume[]>;
  getResume: (id: number) => Promise<Resume>;
  createVacancy: (vacancy: CreateVacancyRequestDto) => Promise<Vacancy | null>;
  apply: (data: { resumeId: number; vacancyId: number }) => Promise<string>;
  createCompany: (company: CreateCompanyDto) => Promise<Company>;
  createResume: (company: CreateResumeDto) => Promise<Resume>;
  setActiveResumeId: (resumeId: number) => Promise<void>;
}

export interface AxiosClient {
  init: (headers: RawAxiosRequestHeaders) => void;
  get: <T>(
    url: string,
    params?: object,
    options?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<T, unknown>>;
  post: <T, K>(
    url: string,
    data: K,
    headers?: RawAxiosRequestHeaders,
    params?: object,
  ) => Promise<AxiosResponse<T, unknown>>;
  put: <T, K>(
    url: string,
    data: K,
    headers?: RawAxiosRequestHeaders,
  ) => Promise<AxiosResponse<T, unknown>>;
  patch: <T, K>(
    url: string,
    data: K,
    headers?: RawAxiosRequestHeaders,
    params?: object,
  ) => Promise<AxiosResponse<T, unknown>>;
  delete: <T, K>(
    url: string,
    data: K,
    headers?: RawAxiosRequestHeaders,
  ) => Promise<AxiosResponse<T, unknown>>;
  sendFormData: <T>(
    url: string,
    data: FormData,
    params?: object,
  ) => Promise<AxiosResponse<T, unknown>>;
}
