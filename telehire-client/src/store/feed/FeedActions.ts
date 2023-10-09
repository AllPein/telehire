import { Resume } from '@/models/Resume';
import { ShortVacancy } from '@/models/Vacancy';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('Vacancy');

export type FeedStore = {
  vacancies: ShortVacancy[] | null;
  candidates: Resume[] | null;
};

export const FeedAction = {
  getVacancies: factory<number | undefined>('GET_VACANCIES_FEED'),
  getCandidates: factory<number | undefined>('GET_CANDIDATES_FEED'),
  setVacancies: factory<ShortVacancy[]>('SET_VACANCIES_FEED'),
  setCandidates: factory<Resume[]>('SET_CANDIDATES_FEED'),
};
