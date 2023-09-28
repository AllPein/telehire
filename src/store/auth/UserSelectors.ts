import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectUserCompanyList = createSelector(
  (state: RootState) => state.user,
  (user) => user.companyList,
);

export const selectUser = createSelector(
  (state: RootState) => state.user,
  (user) => user.userInfo,
);

export const selectAuthenticated = createSelector(
  (state: RootState) => state.user,
  (user) => !!user.token,
);
