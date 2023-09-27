/* eslint-disable import/no-cycle */
import { Epic, ofType } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { CompanyAction } from '../CompanyActions';

export const handleCreateCompany: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { companyService, dispatch }) =>
  action$.pipe(
    ofType(CompanyAction.createCompany),
    switchMap(
      ({ company }) => from(companyService.createCompany(company)),
      // .pipe
      // tap((token: string) => {
      //   supabaseService.init(token);
      // }),
      // (),
    ),
    ignoreElements(),
  );
