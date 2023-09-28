import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { User } from '@/components/models/User';
import { token } from '@/utils/token';
import { UserAction, UserStore } from './UserActions';

export const userStoreInitialState: UserStore = {
  //   userInfo: null,
  userInfo: {
    id: '279058397',
    first_name: 'Aleksandr',
    last_name: 'Panin',
    username: 'allpein',
    photo_url: '',
    companyList: null,
    loggedInAs: null,
  },
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
  .case(UserAction.setToken, (state: UserStore, token: string) => {
    localStorage.setItem('supabase_token', token);

    return {
      ...state,
      token,
    };
  });
