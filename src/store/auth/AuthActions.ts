import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('auth');

export type AuthStore = {
  token: string | null;
};

export const AuthAction = {
  initAuth: factory('INIT_AUTH'),
  initGetToken: factory('INIT_GET_TOKEN'),
  setToken: factory<string>('SET_TOKEN'),
  resetState: factory('RESET_STATE'),
};
