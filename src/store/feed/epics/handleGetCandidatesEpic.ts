/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
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
    switchMap(({ payload: vacancyId }) =>
      from(apiService.getCandidates(vacancyId)).pipe(
        tap((candidates) => {
          dispatch(FeedAction.setCandidates(candidates));
        }),
      ),
    ),
    ignoreElements(),
  );
