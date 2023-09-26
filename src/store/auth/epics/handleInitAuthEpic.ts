/* eslint-disable import/no-cycle */
import { Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { AuthAction } from '@/store/auth/AuthActions';

export const handleInitAuth: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, supabaseService, dispatch }) =>
  action$.pipe(
    ofType(AuthAction.initAuth),
    switchMap(() =>
      from(apiService.getToken()).pipe(
        tap((token: string) => {
          supabaseService.init(token);
        }),
      ),
    ),
    ignoreElements(),
  );
