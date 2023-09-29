import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { CV } from '@/models/CV';
import { ResumeAction, ResumeStore } from './ResumeActions';

export const ResumeStoreInitialState: ResumeStore = {
  currentResume: null,
  resumes: null,
};

export const ResumeReducers = reducerWithInitialState<ResumeStore>(
  ResumeStoreInitialState,
)
  .case(ResumeAction.setResumes, (state: ResumeStore, resumes: CV[]) => {
    return {
      ...state,
      resumes,
    };
  })
  .case(ResumeAction.setCurrentResume, (state: ResumeStore, resume: CV) => {
    return {
      ...state,
      currentResume: resume,
    };
  });
