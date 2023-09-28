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

  async getCompanies(id: string): Promise<Company[]> {
    const { data, error } = await this.#supabase.client
      .from('profile')
      .select('company ( id, name, photo_url, description, volume )')
      .eq('telegram_id', id);

    if (error) {
      throw new Error(error.message);
    }

    return data[0]!.company;
  }
}

export const companyService = new CompanyService();
