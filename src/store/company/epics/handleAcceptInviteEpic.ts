/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { CompanyAction } from '@/store/company/CompanyActions';
import { history } from '@/utils/history';

export const handleAcceptInvite: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(CompanyAction.acceptInvite),
    switchMap(({ payload: hash }) =>
      from(apiService.acceptInvite(hash)).pipe(
        tap((companyId) => {
          if (companyId) {
            history.push('/companies/' + companyId);
          } else {
            history.push('/');
          }
        }),
      ),
    ),

    ignoreElements(),
  );
