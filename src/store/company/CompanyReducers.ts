import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { CompanyStore } from './CompanyActions';

export const companyStoreInitialState: CompanyStore = {
  token: null,
};

export const CompanyReducers = reducerWithInitialState<CompanyStore>(
  companyStoreInitialState,
);
