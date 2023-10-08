import { Spinner } from '@/components/Spinner/Spinner';
import { useMount } from '@/hooks/useMount';
import { UserAction } from '@/store/auth/UserActions';
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
    if (user && !Boolean(localStorage.getItem('started'))) {
      localStorage.setItem('started', 'true');
      dispatch(UserAction.initLogin('company'));
      dispatch(CompanyAction.acceptInvite(hash));
    }

  }, [user]);
  return <Spinner />;
};

export { AcceptInvitePage };
