import PlaceIcon from '@/assets/place.svg';
import { Button } from '@/components/Button/Button';
import {
  Body2,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { CurrencyEnum, ExperienceToLabel } from '@/enums/Vacancy';
import { CurrencyToSymbol, Vacancy } from '@/models/Vacancy';
import { history } from '@/utils/history';
import { FC } from 'react';
import {
  BigWrapper,
  CountryWrapper,
  Delimiter,
  InfoWrapper,
  JobInfoWrapper,
  SmallWrapper,
  Wrapper,
} from './VacancyInfo.styles';

type Props = {
  vacancy: Vacancy;
};

const VacancyInfo: FC<Props> = ({ vacancy }) => {
  const handleApply = () => {
    history.push('/');
  };

  return (
    <Wrapper>
      <BigWrapper center>
        <Heading6>{vacancy.position}</Heading6>
      </BigWrapper>
      <SmallWrapper center>
        <a href={'/company/' + vacancy.company.id}>
          <Caption color="#FFFFFFB2">{vacancy.company.name}</Caption>
        </a>
      </SmallWrapper>
      <SmallWrapper>
        <CountryWrapper>
          <img src={PlaceIcon} />
          <Caption>
            {vacancy.location?.country}, {vacancy.location?.city}
          </Caption>
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
      <BigWrapper>
        <Button block onClick={handleApply}>
          Apply
        </Button>
      </BigWrapper>
    </Wrapper>
  );
};

export { VacancyInfo };
