import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { LoaderReducers } from '@/store/Loader/LoaderReducers';
import { RootState } from '@/store/StoreTypes';
import { UserReducers } from '@/store/auth/UserReducers';
import { DictionaryReducers } from '@/store/dictionary/DictionaryReducers';
import { FeedReducers } from '@/store/feed/FeedReducers';
import { ResumeReducers } from '@/store/resume/ResumeReducers';
import { VacancyReducers } from '@/store/vacancy/VacancyReducers';
import { history } from '@/utils/history';
import { CompanyReducers } from './company/CompanyReducers';

export default combineReducers<RootState>({
  user: UserReducers,
  vacancy: VacancyReducers,
  feed: FeedReducers,
  resume: ResumeReducers,
  dictionary: DictionaryReducers,
  loader: LoaderReducers,
  router: connectRouter(history),
  company: CompanyReducers,
});
