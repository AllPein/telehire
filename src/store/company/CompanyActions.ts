import { Company } from '@/components/models/Company';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('company');

export type CompanyStore = {};

export const CompanyAction = {
  createCompany: factory<Partial<Company>>('CREATE_COMPANY'),
};
