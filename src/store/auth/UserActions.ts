import { User } from '@/components/models/User';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('user');

export type UserStore = {
  userInfo: User | null;
  token: string | null;
};

export const UserAction = {
  initAuth: factory('INIT_AUTH'),
  initLogin: factory<'company' | 'applicant' | null>('INIT_LOGIN'),
  initCompanyList: factory('INIT_COMPANY_LIST'),
  setUser: factory<Partial<User>>('SET_USER'),
  setToken: factory<string>('SET_TOKEN'),
  resetState: factory('RESET_STATE'),
};
