import { ISupabaseService } from '@/services/types';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

class SupabaseService implements ISupabaseService {
  // @ts-ignore
  #supabaseClient: SupabaseClient;

  public get client(): SupabaseClient {
    return this.#supabaseClient;
  }

  get axiosClient() {
    return this.#supabaseClient as SupabaseClient;
  }

  init(token: string) {
    this.#supabaseClient = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      },
    );
  }
}

export const supabaseService = new SupabaseService();
