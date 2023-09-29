import { Button } from '@/components/Button/Button';
import { CompanyItem } from '@/components/CompanyItem/CompanyItem';
import { Heading6 } from '@/components/Typography/Typography.styles';
import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { Company } from '@/models/Company';
import { UserAction } from '@/store/auth/UserActions';
import { history } from '@/utils/history';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { HeadingWrapper, Wrapper } from './CompanyList.styles';

type Props = {
  companies: Company[];
};

const CompanyList: FC<Props> = ({ companies }) => {
  const dispatch = useDispatch();

  const handleCompanyClick = (company: Company) => {
    dispatch(UserAction.initLogin('company'));
    localStorage.setItem(CURRENT_COMPANY_ID, company.id.toString());
    history.push('/profile');
  };

  return (
    <Wrapper>
      <HeadingWrapper>
        <Heading6>Log in as</Heading6>
      </HeadingWrapper>
      {companies.map((company) => (
        <CompanyItem
          onClick={() => handleCompanyClick(company)}
          key={company.id}
          company={company}
        />
      ))}
      <HeadingWrapper>
        <Heading6>Or</Heading6>
      </HeadingWrapper>
      <Button onClick={() => history.push('/create-company')}>
        Create company
      </Button>
    </Wrapper>
  );
};

export { CompanyList };
