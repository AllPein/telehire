import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { LoaderReducers } from '@/store/Loader/LoaderReducers';
import { RootState } from '@/store/StoreTypes';
import { UserReducers } from '@/store/auth/UserReducers';
import { history } from '@/utils/history';
import { CompanyReducers } from './company/CompanyReducers';

export default combineReducers<RootState>({
  user: UserReducers,
  loader: LoaderReducers,
  router: connectRouter(history),
  company: CompanyReducers,
});
