import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('loader');

export type LoadingType =
  | 'auth'
  | 'companyList'
  | 'dictionary'
  | 'createVacancy'
  | 'createResume'
  | 'profile'
  | 'getFeed'
  | 'createCompany';

export type LoadingState = {
  key: LoadingType;
  value: boolean;
};
export type LoadingKeyValue = Record<LoadingType, boolean>;

export interface LoaderStore {
  loading: LoadingKeyValue;
}

export const LoaderAction = {
  setLoading: factory<{ type: LoadingType; value: boolean }>('SET_LOADING'),
  resetStore: factory('RESET_STORE'),
  resetType: factory<LoadingType>('RESET_TYPE'),
};
