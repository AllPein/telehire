import { handleInitAuth } from '@/store/auth/epics/handleInitAuthEpic';
import { handleInitInitialize } from '@/store/auth/epics/handleInitInitializeEpic';
import { handleInitLogin } from '@/store/auth/epics/handleInitLoginEpic';

export const UserEpics = [
  handleInitAuth,
  handleInitLogin,
  handleInitInitialize,
];
