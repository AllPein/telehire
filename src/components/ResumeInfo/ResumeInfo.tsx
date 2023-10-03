import PlaceIcon from '@/assets/place.svg';
import { Button } from '@/components/Button/Button';
import {
  Body2,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { CurrencyEnum, ExperienceToLabel } from '@/enums/Vacancy';
import { useTelegram } from '@/hooks/useTelegram';
import { Resume } from '@/models/Resume';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { selectUser } from '@/store/auth/UserSelectors';
import { history } from '@/utils/history';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  BigWrapper,
  CountryWrapper,
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
  const { tg } = useTelegram();
  const user = useSelector(selectUser);
  const handleApply = () => {
    history.push('/');
  };

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
      <BigWrapper center>
        <Heading6>{resume.position}</Heading6>
      </BigWrapper>
      <SmallWrapper center>
        <a href={'/company/' + vacancy.company.id}>
          <Caption color="#FFFFFFB2">{vacancy.company.name}</Caption>
        </a>
      </SmallWrapper>
      <SmallWrapper>
        <CountryWrapper>
          <img src={PlaceIcon} />
          <Caption>{vacancy.location?.country}</Caption>
        </CountryWrapper>
      </SmallWrapper>
      <BigWrapper>
        <JobInfoWrapper>
          <InfoWrapper>
            <Caption color="#FFFFFFB2">Salary</Caption>
            <SmallWrapper center>
              {vacancy.salaryTo ? (
                <Caption>
                  {vacancy.salaryFrom} - {vacancy.salaryTo}{' '}
                  {CurrencyToSymbol[vacancy.currency as CurrencyEnum]}
                </Caption>
              ) : (
                <Caption>
                  from {vacancy.salaryFrom}
                  {CurrencyToSymbol[vacancy.currency as CurrencyEnum]}
                </Caption>
              )}
            </SmallWrapper>
          </InfoWrapper>
          <Delimiter />
          <InfoWrapper>
            <Caption color="#FFFFFFB2">Job Type</Caption>
            <SmallWrapper center>
              <Caption>{vacancy.jobType}</Caption>
            </SmallWrapper>
          </InfoWrapper>
          <Delimiter />
          <InfoWrapper>
            <Caption color="#FFFFFFB2">Level</Caption>
            <SmallWrapper center>
              <Caption>{ExperienceToLabel[vacancy.experience]}</Caption>
            </SmallWrapper>
          </InfoWrapper>
        </JobInfoWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>Requirements</Body2>
        <SmallWrapper>
          <Caption color="#FFFFFFB2">{vacancy.requirements}</Caption>
        </SmallWrapper>
      </BigWrapper>
      <BigWrapper>
        <Body2>About vacancy</Body2>
        <SmallWrapper>
          <Caption color="#FFFFFFB2">{vacancy.description}</Caption>
        </SmallWrapper>
      </BigWrapper>
      {user?.loggedInAs === 'applicant' && (
        <BigWrapper>
          <Button block onClick={handleApply}>
            Apply
          </Button>
        </BigWrapper>
      )}
    </Wrapper>
  );
};

export { ResumeInfo };
