import { createSelector } from 'reselect';

import { LoaderStore, LoadingType } from '@/store/Loader/LoaderActions';
import { RootState } from '../StoreTypes';

const selectRootState = (state: RootState) => state;

const createLoaderSelector = <
  Name extends LoadingType,
  LoadingState extends keyof LoaderStore,
>(
  name: Name,
  loadingState: LoadingState,
) =>
  createSelector(
    [selectRootState],
    (state) => state.loader[loadingState][name],
  );

const createIsLoadingSelector = <Name extends LoadingType>(name: Name) =>
  createLoaderSelector(name, 'loading');

export const selectAuthLoading = createIsLoadingSelector('auth');
export const selectCompanyListLoading = createIsLoadingSelector('companyList');
