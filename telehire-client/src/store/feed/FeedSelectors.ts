import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectVacancies = createSelector(
  (state: RootState) => state.feed,
  (feed) => feed.vacancies,
);

export const selectCandidates = createSelector(
  (state: RootState) => state.feed,
  (feed) => feed.candidates,
);
