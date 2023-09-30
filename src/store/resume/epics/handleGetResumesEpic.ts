/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { ResumeAction } from '@/store/resume/ResumeActions';

export const handleGetResumes: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(ResumeAction.getResumes),
    switchMap(() =>
      from(apiService.getResumes()).pipe(
        tap((resumes) => {
          dispatch(ResumeAction.setResumes(resumes));
        }),
      ),
    ),
    ignoreElements(),
  );
