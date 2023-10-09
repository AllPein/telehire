import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Resume } from '@/models/Resume';
import { ResumeAction, ResumeStore } from './ResumeActions';

export const ResumeStoreInitialState: ResumeStore = {
  currentResume: null,
  resumes: null,
};

export const ResumeReducers = reducerWithInitialState<ResumeStore>(
  ResumeStoreInitialState,
)
  .case(ResumeAction.setResumes, (state: ResumeStore, resumes: Resume[]) => {
    return {
      ...state,
      resumes,
    };
  })
  .case(ResumeAction.setCurrentResume, (state: ResumeStore, resume: Resume) => {
    return {
      ...state,
      currentResume: resume,
    };
  });
