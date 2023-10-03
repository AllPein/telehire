import { CandidatesList } from '@/components/CandidatesList/CandidatesList';
import { Spinner } from '@/components/Spinner/Spinner';
import { selectGetFeedLoading } from '@/store/Loader/LoaderSelectors';
import { selectUser } from '@/store/auth/UserSelectors';
import { FeedAction } from '@/store/feed/FeedActions';
import { selectCandidates } from '@/store/feed/FeedSelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CandidateListPage = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const dispatch = useDispatch();
  const candidates = useSelector(selectCandidates);
  const user = useSelector(selectUser);
  const loading = useSelector(selectGetFeedLoading);

  useEffect(() => {
    dispatch(FeedAction.getCandidates(Number(vacancyId)));
  }, [user]);

  return (
    <>
      {candidates && !loading ? (
        <CandidatesList candidates={candidates} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export { CandidateListPage };
