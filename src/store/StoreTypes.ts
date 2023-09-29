import { IApiService } from '@/services/types';
import { LoaderStore } from '@/store/Loader/LoaderActions';
import { UserStore } from '@/store/auth/UserActions';
import { ResumeStore } from '@/store/cv/ResumeActions';
import { VacancyStore } from '@/store/vacancy/VacancyActions';
import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { AnyAction, Dispatch } from 'redux';
import { CompanyStore } from './company/CompanyActions';

export interface RootState {
  user: UserStore;
  loader: LoaderStore;
  vacancy: VacancyStore;
  resume: ResumeStore;
  company: CompanyStore;
  router: RouterState;
}

export type StoreDependencies = {
  history: History;
  dispatch: Dispatch<AnyAction>;
  apiService: IApiService;
};
