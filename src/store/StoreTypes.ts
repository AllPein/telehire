import { IApiService } from '@/services/types';
import { LoaderStore } from '@/store/Loader/LoaderActions';
import { UserStore } from '@/store/auth/UserActions';
import { DictionaryStore } from '@/store/dictionary/DictionaryActions';
import { FeedStore } from '@/store/feed/FeedActions';
import { ResumeStore } from '@/store/resume/ResumeActions';
import { VacancyStore } from '@/store/vacancy/VacancyActions';
import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { AnyAction, Dispatch } from 'redux';
import { CompanyStore } from './company/CompanyActions';

export interface RootState {
  user: UserStore;
  loader: LoaderStore;
  feed: FeedStore;
  vacancy: VacancyStore;
  dictionary: DictionaryStore;
  resume: ResumeStore;
  company: CompanyStore;
  router: RouterState;
}

export type StoreDependencies = {
  history: History;
  dispatch: Dispatch<AnyAction>;
  apiService: IApiService;
};
