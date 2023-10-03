import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Vacancy } from '@/models/Vacancy';
import { VacancyAction, VacancyStore } from './VacancyActions';

export const VacancyStoreInitialState: VacancyStore = {
  currentVacancy: null,
};

export const VacancyReducers = reducerWithInitialState<VacancyStore>(
  VacancyStoreInitialState,
).case(
  VacancyAction.setVacancy,
  (state: VacancyStore, vacancy: Vacancy | null) => {
    return {
      ...state,
      currentVacancy: vacancy,
    };
  },
);
