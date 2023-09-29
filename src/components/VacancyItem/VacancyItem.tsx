import CompanyIcon from '@/assets/company.svg';
import PlaceIcon from '@/assets/place.svg';
import {
  Body,
  Body2,
  Caption,
} from '@/components/Typography/Typography.styles';
import { CurrencyEnum, ExperienceToLabel } from '@/enums/Vacancy';
import { CurrencyToSymbol, ShortVacancy } from '@/models/Vacancy';
import { history } from '@/utils/history';
import { FC } from 'react';
import { FlexWrapper, ItemWrapper, Wrapper } from './VacancyItem.styles';

type Props = {
  vacancy: ShortVacancy;
  withoutCompany?: boolean;
};

const VacancyItem: FC<Props> = ({ vacancy, withoutCompany }) => {
  const handleOpenVacancy = () => {
    history.push('/vacancy/' + vacancy.id);
  };

  return (
    <Wrapper onClick={handleOpenVacancy}>
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
            <Caption>
              {vacancy.location.country}, {vacancy.location.city}
            </Caption>
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
    </Wrapper>
  );
};

export { VacancyItem };
