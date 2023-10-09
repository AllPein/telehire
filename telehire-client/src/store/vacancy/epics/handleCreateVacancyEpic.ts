
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
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
    tap(() => {
      dispatch(LoaderAction.setLoading({ type: 'createVacancy', value: true }));
    }),
    switchMap(({ payload: { formData, companyId } }) => {
      const vacancy = mapVacancyFormToVacancyDto(formData, companyId);
      return from(apiService.createVacancy(vacancy)).pipe(
        tap(() => {
          history.push('/companies/' + vacancy.companyId);
        }),
        finalize(() => {
          dispatch(
            LoaderAction.setLoading({ type: 'createVacancy', value: false }),
          );
        }),
      );
    }),
    ignoreElements(),
  );
