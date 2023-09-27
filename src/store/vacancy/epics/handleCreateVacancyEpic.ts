/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { VacancyAction } from '../VacancyActions';
import { ofAction } from '@/operators/ofAction';

export const handleCreateVacancy: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { vacancyService, dispatch }) =>
  action$.pipe(
    ofAction(VacancyAction.createVacancy),
    switchMap(({ payload: vacancy }) =>
      from(vacancyService.createVacancy(vacancy)),
    ),
    ignoreElements(),
  );
