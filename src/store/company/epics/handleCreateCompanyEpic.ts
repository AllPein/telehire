import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { history } from '@/utils/history';
import { CompanyAction } from '../CompanyActions';

export const handleCreateCompany: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { companyService, dispatch }) =>
  action$.pipe(
    ofAction(CompanyAction.createCompany),
    switchMap(({ payload: company }) =>
      from(companyService.createCompany(company)).pipe(
        tap(() => {
          history.push('/vacancies');
        }),
      ),
    ),
    ignoreElements(),
  );
