import { handleCreateResume } from '@/store/resume/epics/handleCreateResumeEpic';
import { handleGetMyResumes } from '@/store/resume/epics/handleGetMyResumesEpic';
import { handleGetResume } from '@/store/resume/epics/handleGetResumeEpic';
import { handleSetActiveResumeId } from '@/store/resume/epics/handleSetActiveResumeEpic';

export const ResumeEpics = [
  handleCreateResume,
  handleGetResume,
  handleGetMyResumes,
  handleSetActiveResumeId,
];
