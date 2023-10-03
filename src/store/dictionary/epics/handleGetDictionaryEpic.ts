/* eslint-disable import/no-cycle */
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import {
  mapCountriesDtoToDictionary,
  mapSkillsDtoToDictionary,
} from '@/utils/dictionary';
import { DictionaryAction } from '../DictionaryActions';

export const handleGetDictionary: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(DictionaryAction.getDictionaryByKey),
    tap(() => {
      dispatch(LoaderAction.setLoading({ type: 'dictionary', value: true }));
    }),
    switchMap(({ payload: { key, payload } }) =>
      from(apiService.getDictionary(key, payload)).pipe(
        tap((dictionary) => {
          let mappedDictionary;
          switch (key) {
            case 'countries':
              mappedDictionary = mapCountriesDtoToDictionary(dictionary);
              break;
            case 'skills':
              mappedDictionary = mapSkillsDtoToDictionary(dictionary);
          }
          dispatch(
            DictionaryAction.setDictionaryByKey({
              key,
              value: mappedDictionary,
            }),
          );
        }),
        finalize(() => {
          dispatch(
            LoaderAction.setLoading({ type: 'dictionary', value: false }),
          );
        }),
      ),
    ),
    ignoreElements(),
  );
