import PlaceIcon from '@/assets/place.svg';
import { Avatar } from '@/components/Avatar/Avatar';
import {
  Body2,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { ExperienceEnum } from '@/enums/Vacancy';
import { useBackButton } from '@/hooks/useBackButton';
import { useMainButton } from '@/hooks/useMainButton';
import { useMount } from '@/hooks/useMount';
import { history } from '@/utils/history';
import {
  BigWrapper,
  CountryWrapper,
  Delimiter,
  InfoWrapper,
  JobInfoWrapper,
  SmallWrapper,
  Wrapper,
} from './VacancyInfo.styles';

const vacancy = {
  id: '1',
  title: 'React developer',
  salary: '1000$',
  country: 'Germany',
  city: 'Berlin',
  company: 'Google',
  photoUrl: 'https://hhcdn.ru/ichameleon/169297.svg',
  experience: ExperienceEnum.Senior,
  jobType: 'Remote',
  requirements: '3-6 years of experience',
  description:
    'Ну у нас работать реально очень круто мяу мяу, приходите пожалуста',
};

const VacancyInfo = () => {
  const handleApply = () => {
    history.push('/');
    onHideButton();
  };

  const { onShowButton, onHideButton } = useMainButton({
    text: 'Apply',
    onClick: handleApply,
  });

  useBackButton({
    onClick: handleApply,
  });

  useMount(() => {
    onShowButton();
  });

  return (
    <Wrapper>
      <Avatar src={vacancy.photoUrl} />
      <BigWrapper center>
        <Heading6>{vacancy.title}</Heading6>
      </BigWrapper>
      <SmallWrapper center>
        <Caption color="#FFFFFFB2">{vacancy.company}</Caption>
      </SmallWrapper>
      <SmallWrapper>
        <CountryWrapper>
          <img src={PlaceIcon} />
          <Caption>
            {vacancy.country}, {vacancy.city}
          </Caption>
        </CountryWrapper>
      </SmallWrapper>
      <BigWrapper>
        <JobInfoWrapper>
          <InfoWrapper>
            <Caption color="#FFFFFFB2">Salary</Caption>
            <SmallWrapper center>
              <Caption>{vacancy.salary}</Caption>
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
              <Caption>{vacancy.experience}</Caption>
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
    </Wrapper>
  );
};

export { VacancyInfo };
