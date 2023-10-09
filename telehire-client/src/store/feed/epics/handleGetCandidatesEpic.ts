/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { FeedAction } from '../FeedActions';

export const handleGetCandidates: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(FeedAction.getCandidates),
    tap(() => {
      dispatch(LoaderAction.setLoading({ type: 'getFeed', value: true }));
    }),
    switchMap(({ payload: vacancyId }) =>
      from(apiService.getCandidates(vacancyId)).pipe(
        tap((candidates) => {
          dispatch(FeedAction.setCandidates(candidates));
        }),
        finalize(() => {
          dispatch(LoaderAction.setLoading({ type: 'getFeed', value: false }));
        }),
      ),
    ),

    ignoreElements(),
  );
