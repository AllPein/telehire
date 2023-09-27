import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectToken = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.token,
);
