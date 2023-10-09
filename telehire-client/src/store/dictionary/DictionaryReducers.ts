import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { DictionaryAction, DictionaryStore } from './DictionaryActions';

export const DictionaryStoreInitialState: DictionaryStore = {
  countries: null,
  skills: null,
};

export const DictionaryReducers = reducerWithInitialState<DictionaryStore>(
  DictionaryStoreInitialState,
).case(
  DictionaryAction.setDictionaryByKey,
  (state: DictionaryStore, { key, value }) => {
    return {
      ...state,
      [key]: value,
    };
  },
);
