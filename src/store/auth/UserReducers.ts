import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Company } from '@/components/models/Company';
import { TelegramUser } from '@/components/models/User';
import { token } from '@/utils/token';
import { UserAction, UserStore } from './UserActions';

export const userStoreInitialState: UserStore = {
  companyList: null,
  userInfo: (window as any).Telegram.WebApp.initDataUnsafe.user,
  //   userInfo: {
  //     id: '279058397',
  //     first_name: 'Aleksandr',
  //     last_name: 'Panin',
  //     username: 'allpein',
  //     photo_url: ''
  //   },
  token: token,
};

export const UserReducers = reducerWithInitialState<UserStore>(
  userStoreInitialState,
)
  .case(
    UserAction.setCompanyList,
    (state: UserStore, companyList: Company[]) => {
      return {
        ...state,
        companyList,
      };
    },
  )
  .case(UserAction.setUser, (state: UserStore, user: TelegramUser) => {
    return {
      ...state,
      userInfo: user,
    };
  })
  .case(UserAction.setToken, (state: UserStore, token: string) => {
    localStorage.setItem('supabase_token', token);

    return {
      ...state,
      token,
    };
  });
