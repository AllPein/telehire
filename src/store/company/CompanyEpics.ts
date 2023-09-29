import { handleGetCompany } from '@/store/company/epics/handleGetCompanyEpic';
import { handleInitGetCompanyList } from '@/store/company/epics/handleInitGetCompanyListEpic';
import { handleCreateCompany } from './epics/handleCreateCompanyEpic';

export const CompanyEpics = [
  handleCreateCompany,
  handleInitGetCompanyList,
  handleGetCompany,
];
