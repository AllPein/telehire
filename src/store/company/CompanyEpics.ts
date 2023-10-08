import { handleAcceptInvite } from '@/store/company/epics/handleAcceptInviteEpic';
import { handleGenerateLink } from '@/store/company/epics/handleGenerateCompanyLink';
import { handleGetCompany } from '@/store/company/epics/handleGetCompanyEpic';
import { handleInitGetCompanyList } from '@/store/company/epics/handleInitGetCompanyListEpic';
import { handleCreateCompany } from './epics/handleCreateCompanyEpic';

export const CompanyEpics = [
  handleCreateCompany,
  handleInitGetCompanyList,
  handleGenerateLink,
  handleAcceptInvite,
  handleGetCompany,
];
