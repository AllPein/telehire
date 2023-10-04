import { Button } from '@/components/Button/Button';
import { CompanyItem } from '@/components/CompanyItem/CompanyItem';
import {
  Body,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { useTelegram } from '@/hooks/useTelegram';
import { Company } from '@/models/Company';
import { User } from '@/models/User';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { ResumeAction } from '@/store/resume/ResumeActions';
import { history } from '@/utils/history';
import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  BigWrapper,
  CVWrapper,
  InactiveWrapper,
  SmallWrapper,
  Wrapper,
} from './Profile.styles';

type Props = {
  user: User;
};

const Profile: FC<Props> = ({ user }) => {
  const { tg } = useTelegram();
  const dispatch = useDispatch();

  const company = useMemo(() => {
    const currentCompanyId = localStorage.getItem(CURRENT_COMPANY_ID);

    if (currentCompanyId && user?.loggedInAs === 'company') {
      return user?.companyList?.find(
        (innerCompany: Company) => innerCompany.id === Number(currentCompanyId),
      );
    }
  }, [user]);

  const activeResume = useMemo(() => {
    return user.resumes!.find(
      (innerResume) => innerResume.id === user.activeResumeId,
    );
  }, [user]);

  const handleChangeActiveResume = (resumeId: number) => {
    dispatch(ResumeAction.setActiveResumeId(resumeId));
  };

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
              <Heading6>Your resumes</Heading6>
            </BigWrapper>
            <SmallWrapper>
              {user.resumes!.map((resume) => (
                <InactiveWrapper key={resume.id}>
                  <input
                    type="radio"
                    checked={resume.id === activeResume?.id}
                    onChange={() => handleChangeActiveResume(resume.id)}
                  />
                  <CVWrapper
                    onClick={() => history.push('/resumes/' + resume.id)}
                  >
                    <>
                      <Body>{resume.position}</Body>
                      <Caption color="#ffffffB2">
                        {resume.salary} {CurrencyToSymbol[resume.currency]}
                      </Caption>
                    </>
                    <Caption color="#ffffffB2">23 views</Caption>
                  </CVWrapper>
                </InactiveWrapper>
              ))}
            </SmallWrapper>
          </>
        ) : (
          <BigWrapper>
            <Heading6>You don't have any resumes yet</Heading6>
          </BigWrapper>
        )}

        <BigWrapper>
          <Button block onClick={() => history.push('/create-resume')}>
            Create new
          </Button>
        </BigWrapper>
      </>
    );
  }, [user, company]);

  return (
    <Wrapper>
      <UserInfo user={user} />
      {profileContent}
    </Wrapper>
  );
};

export { Profile };
