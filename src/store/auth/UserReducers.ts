import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { TOKEN_NAME } from '@/constants/localStorage';
import { Token } from '@/models/User';
import { token } from '@/utils/token';
import { UserAction, UserStore } from './UserActions';

export const userStoreInitialState: UserStore = {
  userInfo: null,
  token: token,
};

export const UserReducers = reducerWithInitialState<UserStore>(
  userStoreInitialState,
)
  //@ts-ignore
  .case(UserAction.setUser, (state: UserStore, user: Partial<User>) => {
    return {
      ...state,
      userInfo: { ...state.userInfo, ...user },
    };
  })
  .case(UserAction.setToken, (state: UserStore, token: Token) => {
    localStorage.setItem(TOKEN_NAME, JSON.stringify(token));

    return {
      ...state,
      token,
    };
  });
