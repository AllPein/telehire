
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';
import { ResumeAction } from '@/store/resume/ResumeActions';

export const handleSetActiveResumeId: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(ResumeAction.setActiveResumeId),
    tap(() => {
      dispatch(LoaderAction.setLoading({ type: 'profile', value: true }));
    }),
    switchMap(({ payload: resumeId }) =>
      from(apiService.setActiveResumeId(resumeId)).pipe(
        tap(() => {
          dispatch(UserAction.getUser());
        }),
      ),
    ),

    ignoreElements(),
  );
