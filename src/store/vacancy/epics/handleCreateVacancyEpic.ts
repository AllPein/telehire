/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { history } from '@/utils/history';
import { mapVacancyFormToVacancyDto } from '@/utils/mappers';
import { VacancyAction } from '../VacancyActions';

export const handleCreateVacancy: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(VacancyAction.createVacancy),
    switchMap(({ payload: { formData, companyId } }) => {
      const vacancy = mapVacancyFormToVacancyDto(formData, companyId);
      return from(apiService.createVacancy(vacancy)).pipe(
        tap(() => {
          history.push('/company/' + vacancy.companyId);
        }),
      );
    }),
    ignoreElements(),
  );
