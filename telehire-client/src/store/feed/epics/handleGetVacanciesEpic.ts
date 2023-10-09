
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { FeedAction } from '../FeedActions';

export const handleGetVacancies: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(FeedAction.getVacancies),
    tap(() => {
      dispatch(LoaderAction.setLoading({ type: 'getFeed', value: true }));
    }),
    switchMap(({ payload: resumeId }) =>
      from(apiService.getVacancies(resumeId)).pipe(
        tap((vacancies) => {
          dispatch(FeedAction.setVacancies(vacancies));
        }),
        finalize(() => {
          dispatch(LoaderAction.setLoading({ type: 'getFeed', value: false }));
        }),
      ),
    ),

    ignoreElements(),
  );
