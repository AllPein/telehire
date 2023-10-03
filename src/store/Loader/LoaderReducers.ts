import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { LoaderAction, LoaderStore, LoadingType } from './LoaderActions';

export const loaderStoreInitialState: LoaderStore = Object.freeze({
  loading: {
    auth: false,
    companyList: false,
    dictionary: false,
    createVacancy: false,
    createResume: false,
    profile: false,
    createCompany: false,
    getFeed: false,
    getCompany: false,
    getResume: false,
  },
});

export const LoaderReducers = reducerWithInitialState<LoaderStore>(
  loaderStoreInitialState,
)
  .case(
    LoaderAction.setLoading,
    (state: LoaderStore, { type, value }): LoaderStore => {
      const cloneState = { ...state };

      cloneState.loading[type] = value;

      return cloneState;
    },
  )
  .case(LoaderAction.resetType, (state, type: LoadingType): LoaderStore => {
    const cloneState = { ...state };

    cloneState.loading[type] = false;

    return cloneState;
  })
  .case(LoaderAction.resetStore, (): LoaderStore => {
    return { ...loaderStoreInitialState };
  });
