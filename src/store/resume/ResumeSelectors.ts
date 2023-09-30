import { createSelector } from 'reselect';

import { RootState } from '../StoreTypes';

export const selectCurrentResume = createSelector(
  (state: RootState) => state.resume,
  (resume) => resume.currentResume,
);

export const selectResumes = createSelector(
  (state: RootState) => state.resume,
  (resume) => resume.resumes,
);
