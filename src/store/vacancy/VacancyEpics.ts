import { handleApply } from '@/store/vacancy/epics/handleApplyEpic';
import { handleGetVacancy } from '@/store/vacancy/epics/handleGetVacancyEpic';
import { handleCreateVacancy } from './epics/handleCreateVacancyEpic';

export const VacancyEpics = [
  handleCreateVacancy,
  handleGetVacancy,
  handleApply,
];
