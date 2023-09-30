/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { ResumeAction } from '@/store/resume/ResumeActions';
import { history } from '@/utils/history';

export const handleCreateResume: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(ResumeAction.createResume),
    switchMap(({ payload: resume }) =>
      from(apiService.createResume(resume)).pipe(
        tap(() => {
          dispatch(ResumeAction.getMyResumes());
          history.push('/profile');
        }),
      ),
    ),
    ignoreElements(),
  );
