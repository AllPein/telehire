import { Avatar } from '@/components/Avatar/Avatar';
import {
  Body2,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { VacancyItem } from '@/components/VacancyItem/VacancyItem';
import { CompanyVolumeToLabel } from '@/enums/Company';
import { Company } from '@/models/Company';
import { FC } from 'react';
import {
  BigWrapper,
  JobInfoWrapper,
  SmallWrapper,
  Wrapper,
} from './CompanyInfo.styles';

type Props = {
  company: Company;
};

const CompanyInfo: FC<Props> = ({ company }) => (
  <Wrapper>
    <Avatar src={company.photoUrl} />
    <BigWrapper center>
      <Heading6>{company.name}</Heading6>
    </BigWrapper>
    <BigWrapper>
      <JobInfoWrapper>
        <Caption color="#FFFFFFB2">Company size</Caption>
        <SmallWrapper center>
          <Caption>{CompanyVolumeToLabel[company.volume]}</Caption>
        </SmallWrapper>
      </JobInfoWrapper>
    </BigWrapper>
    <BigWrapper>
      <Body2>About company</Body2>
      <SmallWrapper>
        <Caption color="#FFFFFFB2">{company.description}</Caption>
      </SmallWrapper>
    </BigWrapper>
    <BigWrapper>
      <Body2>Active positions</Body2>
      <BigWrapper>
        {company.vacancies?.length ? (
          company.vacancies.map((vacancy) => (
            <VacancyItem withoutCompany key={vacancy.id} vacancy={vacancy} />
          ))
        ) : (
          <SmallWrapper>
            <Caption color="#FFFFFFB2">
              {company.name} has no active vacancies yet
            </Caption>
          </SmallWrapper>
        )}
      </BigWrapper>
    </BigWrapper>
  </Wrapper>
);

export { CompanyInfo };