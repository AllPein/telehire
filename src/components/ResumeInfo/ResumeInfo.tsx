import { Button } from '@/components/Button/Button';
import {
  Body2,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { CurrencyEnum } from '@/enums/Vacancy';
import { Resume } from '@/models/Resume';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { selectUser } from '@/store/auth/UserSelectors';
import { history } from '@/utils/history';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  BigWrapper,
  Delimiter,
  InfoWrapper,
  JobInfoWrapper,
  SmallWrapper,
  Wrapper,
} from './ResumeInfo.styles';

type Props = {
  resume: Resume;
};

const ResumeInfo: FC<Props> = ({ resume }) => {
  const user = useSelector(selectUser);
  const handleApply = () => {
    history.push('/');
  };

  return (
    <Wrapper>
      <UserInfo user={resume.user} />
      <BigWrapper center>
        <Heading6>{resume.position}</Heading6>
      </BigWrapper>
      <BigWrapper>
        <JobInfoWrapper>
          <InfoWrapper>
            <Caption color="#FFFFFFB2">Salary</Caption>
            <SmallWrapper center>
              <Caption>
                {resume.salary}
                {CurrencyToSymbol[resume.currency as CurrencyEnum]}
              </Caption>
            </SmallWrapper>
          </InfoWrapper>
          <Delimiter />

          <Delimiter />
          <InfoWrapper>
            <Caption color="#FFFFFFB2">Level</Caption>
            <SmallWrapper center></SmallWrapper>
          </InfoWrapper>
        </JobInfoWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>Personal information</Body2>
        <SmallWrapper>
          <Caption color="#FFFFFFB2">{resume.description}</Caption>
        </SmallWrapper>
      </BigWrapper>
      {user?.loggedInAs === 'company' && (
        <BigWrapper>
          <Button block onClick={handleApply}>
            Invite
          </Button>
        </BigWrapper>
      )}
    </Wrapper>
  );
};

export { ResumeInfo };
