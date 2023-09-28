import {
  IApiService,
  ICompanyService,
  ISupabaseService,
  IVacancyService,
} from '@/services/types';
import { LoaderStore } from '@/store/Loader/LoaderActions';
import { UserStore } from '@/store/auth/UserActions';
import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { AnyAction, Dispatch } from 'redux';
import { CompanyStore } from './company/CompanyActions';

export interface RootState {
  user: UserStore;
  loader: LoaderStore;
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
