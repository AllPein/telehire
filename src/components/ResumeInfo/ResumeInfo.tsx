import {
  Body2,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { CurrencyEnum } from '@/enums/Vacancy';
import { useMainButton } from '@/hooks/useMainButton';
import { useTelegram } from '@/hooks/useTelegram';
import { Resume } from '@/models/Resume';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { selectUser } from '@/store/auth/UserSelectors';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BigWrapper,
  InfoWrapper,
  JobInfoWrapper,
  SmallWrapper,
  Wrapper,
} from './ResumeInfo.styles';

type Props = {
  resume: Resume;
};

const ResumeInfo: FC<Props> = ({ resume }) => {
  const { tg } = useTelegram();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleInvite = () => {
    tg.openTelegramLink(`https://t.me/${resume.user.username}`);
  };

  useMainButton({
    onClick: handleInvite,
    text: 'Contact applicant',
    condition: user?.loggedInAs === 'company',
  });

  return (
    <Wrapper>
      <UserInfo user={resume.user} />
      <BigWrapper center>
        <Heading6>{resume.position}</Heading6>
      </BigWrapper>
      <BigWrapper>
        <JobInfoWrapper>
          <InfoWrapper>
            <Caption>Salary</Caption>
            <SmallWrapper center>
              <Caption>
                {resume.salary}
                {CurrencyToSymbol[resume.currency as CurrencyEnum]}
              </Caption>
            </SmallWrapper>
          </InfoWrapper>
        </JobInfoWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>Information</Body2>
        <SmallWrapper>
          <Caption>{resume.description}</Caption>
        </SmallWrapper>
      </BigWrapper>
    </Wrapper>
  );
};

export { ResumeInfo };
