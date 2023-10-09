import { Company } from '@/models/Company';
import { CompanyFormData } from '@/types/FormData';
import actionCreatorFactory from 'typescript-fsa';

const factory = actionCreatorFactory('company');

export type CompanyStore = {
  currentCompany: Company | null;
};

export const CompanyAction = {
  createCompany: factory<CompanyFormData>('CREATE_COMPANY'),
  acceptInvite: factory<string>('ACCEPT_INVITE'),
  generateLink: factory<number>('GENERATE_COMPANY_LINK'),
  getCompany: factory<number>('GET_COMPANY'),
  setCompany: factory<Company | null>('SET_COMPANY'),
};
