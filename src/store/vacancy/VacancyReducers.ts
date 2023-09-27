import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { VacancyStore } from './VacancyActions';

export const VacancyStoreInitialState: VacancyStore = {
  token: null,
};

export const VacancyReducers = reducerWithInitialState<VacancyStore>(
  VacancyStoreInitialState,
);
