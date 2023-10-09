import { AppliesList } from '@/components/AppliesList/AppliesList';
import { Spinner } from '@/components/Spinner/Spinner';
import { UserAction } from '@/store/auth/UserActions';
import { selectUser } from '@/store/auth/UserSelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AppliesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(UserAction.getApplies(user?.activeResumeId!));
  }, [user?.activeResumeId]);

  return (
    <>{user?.applies ? <AppliesList applies={user.applies} /> : <Spinner />}</>
  );
};

export { AppliesPage };
