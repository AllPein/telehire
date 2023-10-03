import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { User } from '@/models/User';
import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';

export const handleGetUser: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(UserAction.getUser),
    switchMap(() =>
      from(apiService.getUser()).pipe(
        tap((user: User) => {
          dispatch(UserAction.setUser(user));

          dispatch(
            LoaderAction.setLoading({
              type: 'auth',
              value: false,
            }),
          );
        }),
        finalize(() => {
          dispatch(LoaderAction.setLoading({ type: 'profile', value: false }));
        }),
      ),
    ),
    ignoreElements(),
  );
