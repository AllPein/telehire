import { Company } from '@/components/models/Company';
import { TelegramUser } from '@/components/models/User';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('user');

export type UserStore = {
  companyList: Company[] | null;
  token: string | null;
  userInfo: TelegramUser | null;
};

export const UserAction = {
  initAuth: factory('INIT_AUTH'),
  initCompanyList: factory('INIT_COMPANY_LIST'),
  setCompanyList: factory<Company[]>('SET_COMPANY_LIST'),
  setUser: factory<TelegramUser>('SET_USER'),
  setToken: factory<string>('SET_TOKEN'),
  resetState: factory('RESET_STATE'),
};
