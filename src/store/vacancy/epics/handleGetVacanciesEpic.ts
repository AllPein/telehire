/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { VacancyAction } from '../VacancyActions';

export const handleGetVacancies: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(VacancyAction.getVacancies),
    switchMap(({ payload: cvId }) =>
      from(apiService.getVacancies(cvId)).pipe(
        tap((vacancies) => {
          dispatch(VacancyAction.setVacancies(vacancies));
        }),
      ),
    ),
    ignoreElements(),
  );
