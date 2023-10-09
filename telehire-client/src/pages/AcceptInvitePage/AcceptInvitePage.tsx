import { Spinner } from '@/components/Spinner/Spinner';
import { APP_STARTED_FROM_COMMAND } from '@/constants/localStorage';
import { selectUser } from '@/store/auth/UserSelectors';
import { CompanyAction } from '@/store/company/CompanyActions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AcceptInvitePage = () => {
  const dispatch = useDispatch();
  const { hash } = useParams<{ hash: string }>();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user && !Boolean(localStorage.getItem(APP_STARTED_FROM_COMMAND))) {
      localStorage.setItem(APP_STARTED_FROM_COMMAND, 'true');
      dispatch(CompanyAction.acceptInvite(hash));
    }
  }, [user]);
  return <Spinner />;
};

export { AcceptInvitePage };
