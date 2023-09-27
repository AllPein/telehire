import { Company } from '@/components/models/Company';
import { ICompanyService, ISupabaseService } from './types';

class CompanyService implements ICompanyService {
  // @ts-ignore
  #supabase: ISupabaseService;

  init(supabase: ISupabaseService) {
    this.#supabase = supabase;
  }

  async createCompany(company: Partial<Company>): Promise<Company> {
    const { data, error } = await this.#supabase.client
      .from('company')
      .upsert(company)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data![0];
  }
}

export const companyService = new CompanyService();
