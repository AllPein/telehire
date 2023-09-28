import { Company } from '@/components/models/Company';
import { Vacancy } from '@/components/models/Vacancy';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

export interface IApiService {
  init: (axiosClient: AxiosClient) => void;
  getToken: () => Promise<string>;
}

export interface ICompanyService {
  createCompany: (company: Partial<Company>) => Promise<Company>;
  init: (supabaseClient: ISupabaseService) => void;

  getCompanies: (id: string) => Promise<Company[]>;
}

export interface IVacancyService {
  init: (supabaseClient: ISupabaseService) => void;
  createVacancy: (vacancy: Partial<Vacancy>) => Promise<Vacancy>;
}

export interface ISupabaseService {
  init: (token: string) => void;

  get client(): SupabaseClient;
}

export interface AxiosClient {
  init: (baseUrl: string) => void;
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
