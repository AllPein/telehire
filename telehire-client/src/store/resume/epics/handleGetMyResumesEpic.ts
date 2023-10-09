
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';
import { ResumeAction } from '@/store/resume/ResumeActions';

export const handleGetMyResumes: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(ResumeAction.getMyResumes),
    tap(() => {
      dispatch(LoaderAction.setLoading({ type: 'profile', value: true }));
    }),
    switchMap(() =>
      from(apiService.getMyResumes()).pipe(
        tap((resumes) => {
          dispatch(UserAction.setUser({ resumes }));
        }),
        finalize(() => {
          dispatch(LoaderAction.setLoading({ type: 'profile', value: false }));
        }),
      ),
    ),
    ignoreElements(),
  );
