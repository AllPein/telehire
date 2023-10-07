import CompanyIcon from '@/assets/company.svg';
import PlaceIcon from '@/assets/place.svg';
import {
  Body,
  Body2,
  Caption,
} from '@/components/Typography/Typography.styles';
import {
  CurrencyEnum,
  ExperienceToLabel,
  VacancyStatusEnum,
} from '@/enums/Vacancy';
import { CurrencyToSymbol, ShortVacancy } from '@/models/Vacancy';
import { FC } from 'react';
import {
  FlexWrapper,
  ItemWrapper,
  VacancyInfo,
  Wrapper,
} from './VacancyItem.styles';

type Props = {
  vacancy: ShortVacancy;
  withoutCompany?: boolean;
  status?: VacancyStatusEnum;
  onClick: (vacancyId: number) => void;
};

const VacancyItem: FC<Props> = ({
  vacancy,
  withoutCompany,
  onClick,
  status,
}) => (
  <Wrapper onClick={() => onClick(vacancy.id)}>
    <VacancyInfo>
      <div>
        <Body2>{vacancy.position}</Body2>

        <ItemWrapper>
          {vacancy.salaryTo ? (
            <Body>
              {vacancy.salaryFrom} - {vacancy.salaryTo}
              {CurrencyToSymbol[vacancy.currency as CurrencyEnum]}
            </Body>
          ) : (
            <Body>
              from {vacancy.salaryFrom}
              {CurrencyToSymbol[vacancy.currency as CurrencyEnum]}
            </Body>
          )}
        </ItemWrapper>
        <ItemWrapper margin="l">
          {vacancy.jobType === 'Remote' ? (
            <ItemWrapper>
              <Caption color="#FFFFFFB2">{vacancy.jobType}</Caption>
            </ItemWrapper>
          ) : (
            <FlexWrapper>
              <img src={PlaceIcon} />
              <Caption>{vacancy.location?.country}</Caption>
            </FlexWrapper>
          )}
        </ItemWrapper>
        {!withoutCompany && (
          <FlexWrapper>
            <img src={CompanyIcon} />
            <Caption>{vacancy.company.name}</Caption>
          </FlexWrapper>
        )}

        <ItemWrapper>
          <Caption>{ExperienceToLabel[vacancy.experience]}</Caption>
        </ItemWrapper>
      </div>
      {status && <Caption color="rgb(223, 174, 83)">{status}</Caption>}
    </VacancyInfo>
  </Wrapper>
);

export { VacancyItem };
