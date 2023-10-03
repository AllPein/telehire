import { handleGetCandidates } from '@/store/feed/epics/handleGetCandidatesEpic';
import { handleGetVacancies } from '@/store/feed/epics/handleGetVacanciesEpic';

export const FeedEpics = [handleGetVacancies, handleGetCandidates];
