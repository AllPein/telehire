import { Button } from '@/components/Button/Button';
import { CompanyItem } from '@/components/CompanyItem/CompanyItem';
import {
  Body,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { useTelegram } from '@/hooks/useTelegram';
import { Company } from '@/models/Company';
import { User } from '@/models/User';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { history } from '@/utils/history';
import { FC, useMemo } from 'react';
import { BigWrapper, CVWrapper, SmallWrapper, Wrapper } from './Profile.styles';

type Props = {
  user: User;
};

const Profile: FC<Props> = ({ user }) => {
  const { tg } = useTelegram();

  const company = useMemo(() => {
    const currentCompanyId = localStorage.getItem(CURRENT_COMPANY_ID);

    if (currentCompanyId && user?.loggedInAs === 'company') {
      return user?.companyList?.find(
        (innerCompany: Company) => innerCompany.id === Number(currentCompanyId),
      );
    }
  }, [user]);

  const profileContent = useMemo(() => {
    if (user?.loggedInAs === 'company' && company) {
      return (
        <BigWrapper>
          <Heading6>You are logged in as</Heading6>
          <SmallWrapper>
            <CompanyItem
              onClick={() => history.push('/company/' + company.id)}
              company={company}
            />
          </SmallWrapper>
        </BigWrapper>
      );
    }

    return (
      <>
        {user.resumes!.length > 0 ? (
          <>
            <BigWrapper>
              <Heading6>Your CVs</Heading6>
            </BigWrapper>
            <SmallWrapper>
              {user.resumes!.map((cv) => (
                <CVWrapper key={cv.id}>
                  <>
                    <Body>{cv.position}</Body>
                    <Caption color="#ffffffB2">
                      {cv.salary} {CurrencyToSymbol[cv.currency]}
                    </Caption>
                  </>
                  <Caption color="#ffffffB2">23 views</Caption>
                </CVWrapper>
              ))}
            </SmallWrapper>
          </>
        ) : (
          <BigWrapper>
            <Heading6>You don't have any CVs</Heading6>
          </BigWrapper>
        )}

        <BigWrapper>
          <Button block onClick={() => history.push('/create-cv')}>
            Create new
          </Button>
        </BigWrapper>
      </>
    );
  }, [user, company]);

  return (
    <Wrapper>
      <Heading6>
        {user?.first_name} {user?.last_name}
      </Heading6>
      {user?.is_premium && (
        <SmallWrapper>
          <Caption color="rgb(223, 174, 83)">{'Premium user'}</Caption>
        </SmallWrapper>
      )}
      <SmallWrapper>
        <Caption
          onClick={() => tg.openTelegramLink(`https://t.me/${user?.username}`)}
          color="#ffffffB2"
        >
          @{user?.username}
        </Caption>
      </SmallWrapper>
      {profileContent}
    </Wrapper>
  );
};

export { Profile };
