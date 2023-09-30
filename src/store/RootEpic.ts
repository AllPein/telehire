import { UserEpics } from '@/store/auth/UserEpics';
import { ResumeEpics } from '@/store/resume/ResumeEpics';
import { VacancyEpics } from '@/store/vacancy/VacancyEpics';
import { combineEpics } from 'redux-observable';
import { CompanyEpics } from './company/CompanyEpics';

export default combineEpics(
  ...UserEpics,
  ...CompanyEpics,
  ...VacancyEpics,
  ...ResumeEpics,
);
