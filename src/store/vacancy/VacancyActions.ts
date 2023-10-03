import { Vacancy } from '@/models/Vacancy';
import { VacancyFormData } from '@/types/FormData';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('Vacancy');

export type VacancyStore = {
  currentVacancy: Vacancy | null;
};

export const VacancyAction = {
  createVacancy: factory<{ formData: VacancyFormData; companyId: number }>(
    'CREATE_VACANCY',
  ),
  getVacancy: factory<number>('GET_VACANCY'),
  apply: factory<{ vacancyId: number; cvId: number }>('APPLY'),
  setVacancy: factory<Vacancy | null>('SET_VACANCY'),
};
