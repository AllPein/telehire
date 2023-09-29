import { Company } from '@/models/Company';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('company');

export type CompanyStore = {
  currentCompany: Company | null;
};

export const CompanyAction = {
  createCompany: factory<Partial<Company>>('CREATE_COMPANY'),
  getCompany: factory<number>('GET_COMPANY'),
  setCompany: factory<Company | null>('SET_COMPANY'),
};
