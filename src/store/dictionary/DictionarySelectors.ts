import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectCountreis = createSelector(
  (state: RootState) => state.dictionary,
  (dictionary) => dictionary.countries,
);

export const selectSkills = createSelector(
  (state: RootState) => state.dictionary,
  (dictionary) => dictionary.skills,
);
