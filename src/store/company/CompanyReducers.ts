import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Company } from '@/models/Company';
import { CompanyAction, CompanyStore } from './CompanyActions';

export const companyStoreInitialState: CompanyStore = {
  currentCompany: null,
};

export const CompanyReducers = reducerWithInitialState<CompanyStore>(
  companyStoreInitialState,
).case(
  CompanyAction.setCompany,
  (state: CompanyStore, company: Company | null) => {
    return {
      ...state,
      currentCompany: company,
    };
  },
);
