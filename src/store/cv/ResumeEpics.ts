import { handleCreateResume } from '@/store/cv/epics/handleCreateResumeEpic';
import { handleGetMyResumes } from '@/store/cv/epics/handleGetMyResumesEpic';
import { handleGetResume } from '@/store/cv/epics/handleGetResumeEpic';
import { handleGetResumes } from '@/store/cv/epics/handleGetResumesEpic';

export const ResumeEpics = [
  handleCreateResume,
  handleGetResume,
  handleGetResumes,
  handleGetMyResumes,
];
