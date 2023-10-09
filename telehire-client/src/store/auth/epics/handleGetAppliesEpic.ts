import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';

export const handleGetApplies: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(UserAction.getApplies),
    switchMap(({ payload: resumeId }) =>
      from(apiService.getApplies(resumeId)).pipe(
        tap((applies: any[]) => {
          dispatch(UserAction.setUser({ applies }));
        }),
      ),
    ),
    ignoreElements(),
  );
