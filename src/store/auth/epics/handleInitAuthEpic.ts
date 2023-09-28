import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';

export const handleInitAuth: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (
  action$,
  state$,
  { apiService, companyService, vacancyService, supabaseService, dispatch },
) =>
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
    switchMap(() =>
      from(apiService.getToken()).pipe(
        tap((token: string) => {
          supabaseService.init(token);

          companyService.init(supabaseService);
          vacancyService.init(supabaseService);
          dispatch(UserAction.setToken(token));
          dispatch(UserAction.initCompanyList());
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
