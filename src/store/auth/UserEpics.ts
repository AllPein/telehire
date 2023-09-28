import { handleInitAuth } from '@/store/auth/epics/handleInitAuthEpic';
import { handleInitGetCompanyList } from '@/store/auth/epics/handleInitGetCompanyListEpic';
import { handleInitLogin } from '@/store/auth/epics/handleInitLoginEpic';

export const UserEpics = [
  handleInitAuth,
  handleInitGetCompanyList,
  handleInitLogin,
];
