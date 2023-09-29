import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { Token } from '@/models/User';
import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';
import { ResumeAction } from '@/store/cv/ResumeActions';

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
    switchMap(({ payload: data }) =>
      from(apiService.getToken(data.user)).pipe(
        tap((token: Token) => {
          data.client.init({ Authorization: 'Bearer ' + token.token });
          dispatch(UserAction.setToken(token));
          dispatch(UserAction.initCompanyList());
          dispatch(ResumeAction.getMyResumes());
        }),
        finalize(() => {
          dispatch(
            LoaderAction.setLoading({
              type: 'auth',
              value: false,
            }),
          );
        }),
      ),
    ),
    ignoreElements(),
  );
