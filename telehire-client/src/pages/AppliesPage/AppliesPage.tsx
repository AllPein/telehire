import { AppliesList } from '@/components/AppliesList/AppliesList';
import { Spinner } from '@/components/Spinner/Spinner';
import { selectAppliesLoading } from '@/store/Loader/LoaderSelectors';
import { UserAction } from '@/store/auth/UserActions';
import { selectUser } from '@/store/auth/UserSelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AppliesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectAppliesLoading);

  useEffect(() => {
    if (user?.activeResumeId) {
      dispatch(UserAction.getApplies(user?.activeResumeId));
    }
  }, [user?.activeResumeId]);

  return (
    <>
      {!loading ? <AppliesList applies={user?.applies ?? []} /> : <Spinner />}
    </>
  );
};

export { AppliesPage };
