import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { ShortVacancy, Vacancy } from '@/models/Vacancy';
import { VacancyAction, VacancyStore } from './VacancyActions';

export const VacancyStoreInitialState: VacancyStore = {
  currentVacancy: null,
  vacancies: null,
};

export const VacancyReducers = reducerWithInitialState<VacancyStore>(
  VacancyStoreInitialState,
)
  .case(
    VacancyAction.setVacancies,
    (state: VacancyStore, vacancies: ShortVacancy[]) => {
      return {
        ...state,
        vacancies,
      };
    },
  )
  .case(
    VacancyAction.setVacancy,
    (state: VacancyStore, vacancy: Vacancy | null) => {
      return {
        ...state,
        currentVacancy: vacancy,
      };
    },
  );
