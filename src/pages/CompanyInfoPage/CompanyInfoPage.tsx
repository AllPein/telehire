import { CompanyInfo } from '@/components/CompanyInfo/CompanyInfo';
import { Spinner } from '@/components/Spinner/Spinner';
import {
  APP_STARTED_FROM_COMMAND,
  CURRENT_COMPANY_ID,
} from '@/constants/localStorage';
import { UserAction } from '@/store/auth/UserActions';
import { CompanyAction } from '@/store/company/CompanyActions';
import { selectCurrentCompany } from '@/store/company/CompanySelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CompanyInfoPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const dispatch = useDispatch();

  const company = useSelector(selectCurrentCompany);

  useEffect(() => {
    localStorage.removeItem(APP_STARTED_FROM_COMMAND);
    localStorage.setItem(CURRENT_COMPANY_ID, companyId);
    dispatch(UserAction.initLogin('company'));
    dispatch(CompanyAction.getCompany(Number(companyId)));
  }, [companyId]);

  return <>{company ? <CompanyInfo company={company} /> : <Spinner />}</>;
};

export { CompanyInfoPage };
