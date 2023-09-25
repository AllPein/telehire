import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { AuthAction, AuthStore } from './AuthActions';

export const authStoreInitialState: AuthStore = {
  token: null,
};

export const AuthReducers = reducerWithInitialState<AuthStore>(
  authStoreInitialState,
).case(AuthAction.setToken, (state: AuthStore, token: string | null) => {
  return {
    ...state,
    token,
  };
});
