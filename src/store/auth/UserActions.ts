import { Token, User } from '@/models/User';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('user');

export type UserStore = {
  userInfo: User | null;
  token: Token | null;
};

export const UserAction = {
  initAuth: factory<{ id: number }>('INIT_AUTH'),
  initLogin: factory<'company' | 'applicant' | null>('INIT_LOGIN'),
  initCompanyList: factory('INIT_COMPANY_LIST'),
  initInitialize: factory<boolean>('INIT_INITIALIZE'),
  setUser: factory<Partial<User>>('SET_USER'),
  setToken: factory<Token>('SET_TOKEN'),
  resetState: factory('RESET_STATE'),
};
