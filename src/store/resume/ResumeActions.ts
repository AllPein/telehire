import { Resume } from '@/models/Resume';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('Resume');

export type ResumeStore = {
  resumes: Resume[] | null;
  currentResume: Resume | null;
};

export const ResumeAction = {
  createResume: factory<Partial<Resume>>('CREATE_RESUME'),
  getResume: factory<number>('GET_RESUME'),
  getMyResumes: factory('GET_MY_RESUMES'),
  getResumes: factory('GET_RESUMES'),
  setCurrentResume: factory<Resume>('SET_CURRENT_RESUME'),
  setResumes: factory<Resume[]>('SET_RESUMES'),
};
