import { CompanyList } from '@/components/CompanyList/CompanyList';
import { Spinner } from '@/components/Spinner/Spinner';
import { useBackButton } from '@/hooks/useBackButton';
import { selectCompanyListLoading } from '@/store/Loader/LoaderSelectors';
import { selectUser } from '@/store/auth/UserSelectors';
import { history } from '@/utils/history';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const EmployerPage = () => {
  useBackButton();
  const loading = useSelector(selectCompanyListLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.companyList && !user?.companyList.length) {
      history.push('/create-company');
    }
  }, [user]);

  return (
    <>
      {loading || !user?.companyList ? (
        <Spinner />
      ) : (
        <CompanyList companies={user.companyList} />
      )}
    </>
  );
};

export { EmployerPage };
