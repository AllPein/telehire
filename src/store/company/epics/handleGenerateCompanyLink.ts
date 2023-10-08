/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { CompanyAction } from '@/store/company/CompanyActions';

export const handleGenerateLink: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(CompanyAction.generateLink),
    switchMap(({ payload: companyId }) =>
      from(apiService.generateLink(companyId)).pipe(
        tap(async (link) => {
          await navigator.clipboard.writeText(
            `https://t.me/intouche_bot/telehire?startapp=company${link}`,
          );
          alert('The link was copied into clipboard!');
        }),
      ),
    ),

    ignoreElements(),
  );
