import { CompanyList } from '@/components/CompanyList/CompanyList';
import { Spinner } from '@/components/Spinner/Spinner';
import { selectCompanyListLoading } from '@/store/Loader/LoaderSelectors';
import { UserAction } from '@/store/auth/UserActions';
import {
  selectAuthenticated,
  selectUserCompanyList,
} from '@/store/auth/UserSelectors';
import { history } from '@/utils/history';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EmployerPage = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectAuthenticated);
  const loading = useSelector(selectCompanyListLoading);
  const companyList = useSelector(selectUserCompanyList);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(UserAction.initCompanyList());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (companyList && !companyList.length) {
      history.push('/create-company');
    }
  }, [companyList]);

  return (
    <>
      {loading || !companyList ? (
        <Spinner />
      ) : (
        <CompanyList companies={companyList} />
      )}
    </>
  );
};

export { EmployerPage };
