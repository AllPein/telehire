import { ResumeInfo } from '@/components/ResumeInfo/ResumeInfo';
import { Spinner } from '@/components/Spinner/Spinner';
import { ResumeAction } from '@/store/resume/ResumeActions';
import { selectCurrentResume } from '@/store/resume/ResumeSelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ResumePage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const dispatch = useDispatch();
  const currentResume = useSelector(selectCurrentResume);

  useEffect(() => {
    dispatch(ResumeAction.getResume(Number(resumeId)));

    return () => {
      dispatch(ResumeAction.setCurrentResume(null));
    };
  }, [resumeId]);

  return (
    <>{currentResume ? <ResumeInfo resume={currentResume} /> : <Spinner />}</>
  );
};

export { ResumePage };
