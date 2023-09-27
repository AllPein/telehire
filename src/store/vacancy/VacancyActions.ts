import { Vacancy } from '@/components/models/Vacancy';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('Vacancy');

export type VacancyStore = {};

export const VacancyAction = {
  createVacancy: factory<Partial<Vacancy>>('CREATE_VACANCY'),
};
