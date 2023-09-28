import { UserEpics } from '@/store/auth/UserEpics';
import { combineEpics } from 'redux-observable';
import { CompanyEpics } from './company/CompanyEpics';

export default combineEpics(...UserEpics, ...CompanyEpics);
