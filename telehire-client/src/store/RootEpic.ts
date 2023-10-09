import { UserEpics } from '@/store/auth/UserEpics';
import { DictionaryEpics } from '@/store/dictionary/DictionaryEpics';
import { FeedEpics } from '@/store/feed/FeedEpics';
import { ResumeEpics } from '@/store/resume/ResumeEpics';
import { VacancyEpics } from '@/store/vacancy/VacancyEpics';
import { combineEpics } from 'redux-observable';
import { CompanyEpics } from '@/store/company/CompanyEpics';

export default combineEpics(
  ...UserEpics,
  ...CompanyEpics,
  ...VacancyEpics,
  ...ResumeEpics,
  ...DictionaryEpics,
  ...FeedEpics,
);
