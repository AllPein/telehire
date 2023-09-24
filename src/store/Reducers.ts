import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { RootState } from '@/store/StoreTypes';
import { history } from '@/utils/history';

export default combineReducers<RootState>({
  router: connectRouter(history),
});
