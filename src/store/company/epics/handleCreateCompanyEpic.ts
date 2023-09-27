import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { CompanyAction } from '../CompanyActions';

export const handleCreateCompany: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { companyService, dispatch }) =>
  action$.pipe(
    ofAction(CompanyAction.createCompany),
    switchMap(
      ({ payload: company }) => from(companyService.createCompany(company)),
      // .pipe
      // tap((token: string) => {
      //   supabaseService.init(token);
      // }),
      // (),
    ),
    ignoreElements(),
  );
