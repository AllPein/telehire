import { handleGetVacancies } from '@/store/vacancy/epics/handleGetVacanciesEpic';
import { handleGetVacancy } from '@/store/vacancy/epics/handleGetVacancyEpic';
import { handleCreateVacancy } from './epics/handleCreateVacancyEpic';

export const VacancyEpics = [
  handleCreateVacancy,
  handleGetVacancy,
  handleGetVacancies,
];
