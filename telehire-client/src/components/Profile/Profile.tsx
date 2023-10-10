import { Button } from '@/components/Button/Button';
import { CompanyItem } from '@/components/CompanyItem/CompanyItem';
import {
  BigWrapper,
  SmallWrapper,
  Wrapper,
} from '@/components/Layout/Layout.styles';
import {
  Body,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { useMainButton } from '@/hooks/useMainButton';
import { Company } from '@/models/Company';
import { User } from '@/models/User';
import { ResumeAction } from '@/store/resume/ResumeActions';
import { history } from '@/utils/history';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CVWrapper, InactiveWrapper } from './Profile.styles';
import { selectCurrentCompany } from '@/store/company/CompanySelectors';

type Props = {
  user: User;
};

const Profile: FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const company = useSelector(selectCurrentCompany);

  useMainButton({
    onClick: () => history.push('/create-resume'),
    text: 'Create new resume',
    condition: user.loggedInAs === 'applicant',
  });

  const activeResume = useMemo(() => {
    return user.resumes!.find(
      (innerResume) => innerResume.id === user.activeResumeId,
    );
  }, [user]);

  const handleChangeActiveResume = (resumeId: number) => {
    dispatch(ResumeAction.setActiveResumeId(resumeId));
  };

  const profileContent = useMemo(() => {
    if (user.loggedInAs === 'company') {
      return (
        <BigWrapper center>
          <Heading6>You are logged in as</Heading6>
          <SmallWrapper>
            <CompanyItem
              onClick={() => history.push('/companies/' + company?.id)}
              company={company ?? undefined}
            />
          </SmallWrapper>
        </BigWrapper>
      );
    }

    return (
      <>
        {user.resumes!.length > 0 ? (
          <>
            <BigWrapper center>
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
                    </>
                    <Caption>{resume.views} views</Caption>
                    <Button size="s">Boost</Button>
                  </CVWrapper>
                </InactiveWrapper>
              ))}
            </SmallWrapper>
          </>
        ) : (
          <BigWrapper center>
            <Heading6>You don't have any resumes yet</Heading6>
          </BigWrapper>
        )}
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
