import { CV } from '@/models/CV';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('Resume');

export type ResumeStore = {
  resumes: CV[] | null;
  currentResume: CV | null;
};

export const ResumeAction = {
  createResume: factory<Partial<CV>>('CREATE_CV'),
  getResume: factory<number>('GET_CV'),
  getMyResumes: factory('GET_MY_CVS'),
  getResumes: factory('GET_RESUMES'),
  setCurrentResume: factory<CV>('SET_CURRENT_RESUME'),
  setResumes: factory<CV[]>('SET_RESUMES'),
};
