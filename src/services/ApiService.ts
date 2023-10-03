import { Company } from '@/models/Company';
import { Resume } from '@/models/Resume';
import { Token } from '@/models/User';
import { ShortVacancy, Vacancy } from '@/models/Vacancy';
import { AxiosClient, IApiService } from '@/services/types';
import { CreateResumeDto } from '@/store/resume/types';
import { CreateVacancyRequestDto } from '@/store/vacancy/types';

class ApiService implements IApiService {
  // @ts-ignore
  #axiosClient: AxiosClient;

  get axiosClient() {
    return this.#axiosClient as AxiosClient;
  }

  init(axiosClient: AxiosClient) {
    this.#axiosClient = axiosClient;
  }

  async getToken(data: string): Promise<Token> {
    try {
      const res = await this.axiosClient.get<any>(
        '/auth/login',
        {},
        {
          headers: {
            'x-twa-init-data': data,
          },
        },
      );

      return res.data as Token;
    } catch (err: any) {
      return err;
    }
  }

  async createCompany(company: Partial<Company>): Promise<Company> {
    try {
      const res = await this.#axiosClient.post<any, any>('/companies', company);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getCompany(companyId: number): Promise<Company> {
    try {
      const res = await this.#axiosClient.get<any>('/companies/' + companyId);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getCompanies(): Promise<Company[]> {
    try {
      const res = await this.#axiosClient.get<any>('/companies/my');

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async createVacancy(vacancy: CreateVacancyRequestDto): Promise<Vacancy> {
    try {
      const res = await this.#axiosClient.post<any, any>('/vacancies', vacancy);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getVacancies(resumeId: number | undefined): Promise<ShortVacancy[]> {
    try {
      const url = resumeId ? '/feed/vacancies/' + resumeId : '/vacancies';
      const res = await this.#axiosClient.get<any>(url);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getCandidates(vacancyId: number | undefined): Promise<Resume[]> {
    try {
      const url = vacancyId ? '/feed/candidates/' + vacancyId : '/cvs';
      const res = await this.#axiosClient.get<any>(url);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getVacancy(vacancyId: number): Promise<Vacancy> {
    try {
      const res = await this.#axiosClient.get<any>('/vacancies/' + vacancyId);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getResumes(): Promise<Resume[]> {
    try {
      const res = await this.#axiosClient.get<any>('/cvs');

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getMyResumes(): Promise<Resume[]> {
    try {
      const res = await this.#axiosClient.get<any>('/cvs/my');

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getResume(resumeId: number): Promise<Resume> {
    try {
      const res = await this.#axiosClient.get<any>('/cvs/' + resumeId);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async createResume(resume: CreateResumeDto): Promise<Resume> {
    try {
      const res = await this.#axiosClient.post<any, any>('/cvs', resume);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async getDictionary(key: string, payload?: any): Promise<any> {
    try {
      let url;
      let baseURL;
      switch (key) {
        case 'countries':
          url = '/all?fields=name';
          baseURL = 'https://restcountries.com/v3.1';
          break;

        case 'skills':
          url = `/skills?q=${payload.query}`;
          break;

        default:
          url = '/all';
          break;
      }

      const res = await this.#axiosClient.get(
        url,
        {},
        {
          baseURL,
        },
      );

      return res.data;
    } catch (err: any) {
      return err;
    }
  }

  async apply(data: { cvId: number; vacancyId: number }): Promise<string> {
    try {
      await this.#axiosClient.post<any, any>('/applies', data);

      return 'success';
    } catch (err: any) {
      return 'error';
    }
  }
}

export const apiService = new ApiService();
