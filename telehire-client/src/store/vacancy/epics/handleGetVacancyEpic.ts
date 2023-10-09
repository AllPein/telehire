/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { VacancyAction } from '../VacancyActions';

export const handleGetVacancy: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(VacancyAction.getVacancy),
    switchMap(({ payload: vacancyId }) =>
      from(apiService.getVacancy(vacancyId)).pipe(
        tap((vacancy) => {
          dispatch(VacancyAction.setVacancy(vacancy));
        }),
      ),
    ),
    ignoreElements(),
  );
