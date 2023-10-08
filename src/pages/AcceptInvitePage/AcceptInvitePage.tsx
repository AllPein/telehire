import { Spinner } from '@/components/Spinner/Spinner';
import { useMount } from '@/hooks/useMount';
import { UserAction } from '@/store/auth/UserActions';
import { CompanyAction } from '@/store/company/CompanyActions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const AcceptInvitePage = () => {
  const dispatch = useDispatch();
  const { hash } = useParams<{ hash: string }>();

  useMount(() => {
    dispatch(UserAction.initLogin('company'));
    dispatch(CompanyAction.acceptInvite(hash));
  });
  return <Spinner />;
};

export { AcceptInvitePage };
