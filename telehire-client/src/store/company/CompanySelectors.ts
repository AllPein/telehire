import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectCurrentCompany = createSelector(
  (state: RootState) => state.company,
  (company) => company.currentCompany,
);
