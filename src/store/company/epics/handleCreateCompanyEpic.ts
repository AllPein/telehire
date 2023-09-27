/* eslint-disable import/no-cycle */
import { Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { CompanyAction } from '../CompanyActions';
import { ofAction } from '@/operators/ofAction';

export const handleCreateCompany: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { companyService, dispatch }) =>
  action$.pipe(
    ofAction(CompanyAction.createCompany),
    switchMap(({ payload: company }) =>
      from(companyService.createCompany(company)),
    ),
    ignoreElements(),
  );
