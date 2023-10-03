import { Resume } from '@/models/Resume';
import { ResumeFormData } from '@/types/FormData';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('Resume');

export type ResumeStore = {
  resumes: Resume[] | null;
  currentResume: Resume | null;
};

export const ResumeAction = {
  createResume: factory<ResumeFormData>('CREATE_RESUME'),
  getResume: factory<number>('GET_RESUME'),
  getMyResumes: factory('GET_MY_RESUMES'),
  getResumes: factory('GET_RESUMES'),
  setCurrentResume: factory<Resume | null>('SET_CURRENT_RESUME'),
  setResumes: factory<Resume[]>('SET_RESUMES'),
};
