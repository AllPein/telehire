import { AuthEpics } from '@/store/auth/AuthEpics';
import { combineEpics } from 'redux-observable';

export default combineEpics(...AuthEpics);
