import { CompanyInfo } from '@/components/CompanyInfo/CompanyInfo';
import { Spinner } from '@/components/Spinner/Spinner';
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
    localStorage.removeItem('started');
    dispatch(CompanyAction.getCompany(Number(companyId)));
  }, [companyId]);

  return <>{company ? <CompanyInfo company={company} /> : <Spinner />}</>;
};

export { CompanyInfoPage };
