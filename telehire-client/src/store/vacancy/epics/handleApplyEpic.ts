
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { history } from '@/utils/history';
import { VacancyAction } from '../VacancyActions';

export const handleApply: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(VacancyAction.apply),
    switchMap(({ payload: { resumeId, vacancyId } }) => {
      return from(apiService.apply({ resumeId, vacancyId })).pipe(
        tap((status) => {
          if (status === 'success') {
            history.push('/vacancies');
          }
        }),
      );
    }),
    ignoreElements(),
  );
