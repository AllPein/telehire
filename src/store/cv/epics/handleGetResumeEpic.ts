/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { ResumeAction } from '@/store/cv/ResumeActions';

export const handleGetResume: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(ResumeAction.getResume),
    switchMap(({ payload: resumeId }) =>
      from(apiService.getResume(resumeId)).pipe(
        tap((resume) => {
          dispatch(ResumeAction.setCurrentResume(resume));
        }),
      ),
    ),
    ignoreElements(),
  );
