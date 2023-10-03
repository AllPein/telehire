import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { TOKEN_NAME } from '@/constants/localStorage';
import { Token } from '@/models/User';
import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';

export const handleInitAuth: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(UserAction.initAuth),
    tap(() => {
      dispatch(
        LoaderAction.setLoading({
          type: 'auth',
          value: true,
        }),
      );
    }),
    switchMap(({ payload: { initData, axiosClient } }) =>
      from(apiService.getToken(initData)).pipe(
        tap((token: Token) => {
          localStorage.setItem(TOKEN_NAME, JSON.stringify(token));
          console.log(token);
          dispatch(
            UserAction.initInitialize({ axiosClient, withLoad: false, token }),
          );
        }),
      ),
    ),
    ignoreElements(),
  );
