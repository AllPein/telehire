import { ISupabaseService, IVacancyService } from './types';
import { Vacancy } from '@/components/models/Vacancy';

class VacancyService implements IVacancyService {
  // @ts-ignore
  #supabase: ISupabaseService;

  init(supabase: ISupabaseService) {
    this.#supabase = supabase;
  }

  async createVacancy(vacancy: Partial<Vacancy>): Promise<Vacancy> {
    const { data, error } = await this.#supabase.client
      .from('vacancy')
      .upsert(vacancy)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data![0];
  }
}

export const vacancyService = new VacancyService();
