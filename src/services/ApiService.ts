import { Company } from '@/models/Company';
import { Resume } from '@/models/Resume';
import { Token } from '@/models/User';
import { ShortVacancy, Vacancy } from '@/models/Vacancy';
import { AxiosClient, IApiService } from '@/services/types';
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

  async getToken(data: { id: number }): Promise<Token> {
    try {
      const res = await this.axiosClient.post<any, any>(
        '/auth/email/login',
        data,
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

  async createResume(resume: Partial<Resume>): Promise<Resume> {
    try {
      const res = await this.#axiosClient.post<any, any>('/cvs', resume);

      return res.data;
    } catch (err: any) {
      return err;
    }
  }
}

export const apiService = new ApiService();
