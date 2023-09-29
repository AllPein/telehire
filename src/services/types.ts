import { CV } from '@/models/CV';
import { Company } from '@/models/Company';
import { Token } from '@/models/User';
import { ShortVacancy, Vacancy } from '@/models/Vacancy';
import {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

export interface IApiService {
  init: (axiosClient: AxiosClient) => void;
  getToken: (data: { id: number }) => Promise<Token>;
  getCompanies: () => Promise<Company[]>;
  getCompany: (id: number) => Promise<Company>;
  getVacancies: (id: number | undefined) => Promise<ShortVacancy[]>;
  getVacancy: (id: number) => Promise<Vacancy>;
  getResumes: () => Promise<CV[]>;
  getMyResumes: () => Promise<CV[]>;
  getResume: (id: number) => Promise<CV>;
  createVacancy: (vacancy: Partial<Vacancy>) => Promise<Vacancy | null>;
  createCompany: (company: Partial<Company>) => Promise<Company>;
  createResume: (company: Partial<CV>) => Promise<CV>;
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
