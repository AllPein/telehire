import { handleCreateResume } from '@/store/resume/epics/handleCreateResumeEpic';
import { handleGetMyResumes } from '@/store/resume/epics/handleGetMyResumesEpic';
import { handleGetResume } from '@/store/resume/epics/handleGetResumeEpic';
import { handleGetResumes } from '@/store/resume/epics/handleGetResumesEpic';

export const ResumeEpics = [
  handleCreateResume,
  handleGetResume,
  handleGetResumes,
  handleGetMyResumes,
];
