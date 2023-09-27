import { AuthEpics } from '@/store/auth/AuthEpics';
import { combineEpics } from 'redux-observable';
import { CompanyEpics } from './company/CompanyEpics';

export default combineEpics(...AuthEpics, ...CompanyEpics);
