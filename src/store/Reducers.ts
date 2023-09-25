import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { RootState } from '@/store/StoreTypes';
import { AuthReducers } from '@/store/auth/AuthReducers';
import { history } from '@/utils/history';

export default combineReducers<RootState>({
  auth: AuthReducers,
  router: connectRouter(history),
});
