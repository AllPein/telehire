import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectCurrentVacancy = createSelector(
  (state: RootState) => state.vacancy,
  (vacancy) => vacancy.currentVacancy,
);
