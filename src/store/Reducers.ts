import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { LoaderReducers } from '@/store/Loader/LoaderReducers';
import { RootState } from '@/store/StoreTypes';
import { UserReducers } from '@/store/auth/UserReducers';
import { ResumeReducers } from '@/store/cv/ResumeReducers';
import { VacancyReducers } from '@/store/vacancy/VacancyReducers';
import { history } from '@/utils/history';
import { CompanyReducers } from './company/CompanyReducers';

export default combineReducers<RootState>({
  user: UserReducers,
  vacancy: VacancyReducers,
  resume: ResumeReducers,
  loader: LoaderReducers,
  router: connectRouter(history),
  company: CompanyReducers,
});
