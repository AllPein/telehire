import { ShortVacancy, Vacancy } from '@/models/Vacancy';
import { CreateVacancyRequestDto } from '@/store/vacancy/types';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('Vacancy');

export type VacancyStore = {
  vacancies: ShortVacancy[] | null;
  currentVacancy: Vacancy | null;
};

export const VacancyAction = {
  createVacancy: factory<CreateVacancyRequestDto>('CREATE_VACANCY'),
  getVacancy: factory<number>('GET_VACANCY'),
  getVacancies: factory<number | undefined>('GET_VACANCIES'),
  setVacancy: factory<Vacancy | null>('SET_VACANCY'),
  setVacancies: factory<ShortVacancy[]>('SET_VACANCIES'),
};
