import { Epic } from 'redux-observable';
import { from, throwError } from 'rxjs';
import {
  catchError,
  finalize,
  ignoreElements,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';

export const handleInitGetCompanyList: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { companyService, dispatch }) =>
  action$.pipe(
    ofAction(UserAction.initCompanyList),
    tap(() =>
      dispatch(LoaderAction.setLoading({ type: 'companyList', value: true })),
    ),
    switchMap(() =>
      from(companyService.getCompanies(state$.value.user.userInfo!.id)).pipe(
        tap((companies) => {
          dispatch(UserAction.setUser({ companyList: companies }));
        }),
        catchError((err) => {
          return throwError(err);
        }),
        finalize(() =>
          dispatch(
            LoaderAction.setLoading({ type: 'companyList', value: false }),
          ),
        ),
      ),
    ),
    ignoreElements(),
  );
