import CompanyIcon from '@/assets/company.svg';
import PlaceIcon from '@/assets/place.svg';
import {
  Body,
  Body2,
  Caption,
} from '@/components/Typography/Typography.styles';
import { Vacancy } from '@/components/models/Vacancy';
import { ExperienceEnum } from '@/enums/Vacancy';
import { FC } from 'react';
import { FlexWrapper, ItemWrapper, Wrapper } from './VacancyItem.styles';

type Props = {
  vacancy: Vacancy;
};

const ExperienceToLabel = {
  [ExperienceEnum.No]: 'No experience',
  [ExperienceEnum.Junior]: '0 - 1 year',
  [ExperienceEnum.Middle]: '1 - 3 years',
  [ExperienceEnum.Senior]: '3 - 6 years',
  [ExperienceEnum.Extra]: 'More than 6 years',
};

const VacancyItem: FC<Props> = ({ vacancy }) => {
  return (
    <Wrapper>
      <Body2>{vacancy.title}</Body2>
      <ItemWrapper>
        <Body>{vacancy.salary}</Body>
      </ItemWrapper>
      <ItemWrapper margin="l">
        <FlexWrapper>
          <img src={PlaceIcon} />
          <Caption>
            {vacancy.country}, {vacancy.city}
          </Caption>
        </FlexWrapper>
      </ItemWrapper>
      <FlexWrapper>
        <img src={CompanyIcon} />
        <Caption>{vacancy.company}</Caption>
      </FlexWrapper>
      <ItemWrapper>
        <Caption>{ExperienceToLabel[vacancy.experience]}</Caption>
      </ItemWrapper>
    </Wrapper>
  );
};

export { VacancyItem };
