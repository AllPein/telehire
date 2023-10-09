import { Token, User } from '@/models/User';
import { AxiosClient } from '@/services/types';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('user');

export type UserStore = {
  userInfo: User | null;
  token: Token | null;
};

export const UserAction = {
  initAuth: factory<{
    initData: string;
    axiosClient: AxiosClient;
  }>('INIT_AUTH'),
  initLogin: factory<'company' | 'applicant' | null>('INIT_LOGIN'),
  initCompanyList: factory('INIT_COMPANY_LIST'),
  initInitialize: factory<{
    withLoad: boolean;
    axiosClient: AxiosClient;
    token: Token;
  }>('INIT_INITIALIZE'),
  getUser: factory('GET_USER'),
  setUser: factory<Partial<User>>('SET_USER'),
  getApplies: factory<number>('GET_APPLIES'),
  setToken: factory<Token>('SET_TOKEN'),
  resetState: factory('RESET_STATE'),
};
