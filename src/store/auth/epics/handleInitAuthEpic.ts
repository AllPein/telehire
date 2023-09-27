import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { AuthAction } from '@/store/auth/AuthActions';

export const handleInitAuth: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, supabaseService, dispatch }) =>
  action$.pipe(
    ofAction(AuthAction.initAuth),
    switchMap(() =>
      from(apiService.getToken()).pipe(
        tap((token: string) => {
          supabaseService.init(token);
        }),
      ),
    ),
    ignoreElements(),
  );
