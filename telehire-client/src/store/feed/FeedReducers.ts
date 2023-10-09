import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Resume } from '@/models/Resume';
import { ShortVacancy } from '@/models/Vacancy';
import { FeedAction, FeedStore } from '@/store/feed/FeedActions';

export const FeedStoreInitialState: FeedStore = {
  vacancies: null,
  candidates: null,
};

export const FeedReducers = reducerWithInitialState<FeedStore>(
  FeedStoreInitialState,
)
  .case(
    FeedAction.setVacancies,
    (state: FeedStore, vacancies: ShortVacancy[]) => {
      return {
        ...state,
        vacancies,
      };
    },
  )
  .case(FeedAction.setCandidates, (state: FeedStore, candidates: Resume[]) => {
    return {
      ...state,
      candidates,
    };
  });
