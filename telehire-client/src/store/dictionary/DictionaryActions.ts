import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('Dicrionary');

export type DictionaryStore = {
  countries: any | null;
  skills: any | null;
};

export const DictionaryAction = {
  getDictionaryByKey: factory<{ key: string; payload?: any }>(
    'GET_DICTIONARY_BY_KEY',
  ),
  setDictionaryByKey: factory<{ key: string; value: any }>(
    'SET_DICTIONARY_BY_KEY',
  ),
};
