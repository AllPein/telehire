/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { CompanyAction } from '@/store/company/CompanyActions';

export const handleGetCompany: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(CompanyAction.getCompany),
    switchMap(({ payload: companyId }) =>
      from(apiService.getCompany(companyId)).pipe(
        tap((company) => {
          dispatch(CompanyAction.setCompany(company));
        }),
      ),
    ),

    ignoreElements(),
  );
