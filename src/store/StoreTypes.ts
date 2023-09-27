import {
  IApiService,
  ICompanyService,
  ISupabaseService,
  IVacancyService,
} from '@/services/types';
import { AuthStore } from '@/store/auth/AuthActions';
import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { AnyAction, Dispatch } from 'redux';
import { CompanyStore } from './company/CompanyActions';

export interface RootState {
  auth: AuthStore;
  company: CompanyStore;
  router: RouterState;
}

export type StoreDependencies = {
  history: History;
  dispatch: Dispatch<AnyAction>;
  supabaseService: ISupabaseService;
  companyService: ICompanyService;
  vacancyService: IVacancyService;
  apiService: IApiService;
};
