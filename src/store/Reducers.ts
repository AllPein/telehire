import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { RootState } from '@/store/StoreTypes';
import { AuthReducers } from '@/store/auth/AuthReducers';
import { history } from '@/utils/history';
import { CompanyReducers } from './company/CompanyReducers';

export default combineReducers<RootState>({
  auth: AuthReducers,
  router: connectRouter(history),
  company: CompanyReducers,
});
