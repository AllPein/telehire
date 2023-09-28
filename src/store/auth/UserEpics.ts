import { handleInitAuth } from '@/store/auth/epics/handleInitAuthEpic';
import { handleInitGetCompanyList } from '@/store/auth/epics/handleInitGetCompanyListEpic';

export const UserEpics = [handleInitAuth, handleInitGetCompanyList];
