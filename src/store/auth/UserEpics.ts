import { handleInitAuth } from '@/store/auth/epics/handleInitAuthEpic';
import { handleInitLogin } from '@/store/auth/epics/handleInitLoginEpic';

export const UserEpics = [handleInitAuth, handleInitLogin];
