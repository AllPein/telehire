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
import { mdiDomain, mdiMapMarker } from '@mdi/js';
import { Icon } from '@mdi/react';
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

const mapStatusToColor = {
  [VacancyStatusEnum.Accepted]: 'var(--tg-theme-accepted-color)',
  [VacancyStatusEnum.Denied]: 'var(--tg-theme-denied-color)',
  [VacancyStatusEnum.Pending]: undefined,
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
              <Caption>{vacancy.jobType}</Caption>
            </ItemWrapper>
          ) : (
            <FlexWrapper>
              <Icon path={mdiMapMarker} size={0.5} />
              <Caption>{vacancy.location?.country}</Caption>
            </FlexWrapper>
          )}
        </ItemWrapper>
        {!withoutCompany && (
          <FlexWrapper>
            <Icon path={mdiDomain} size={0.5} />
            <Caption>{vacancy.company.name}</Caption>
          </FlexWrapper>
        )}

        <ItemWrapper>
          <Caption>{ExperienceToLabel[vacancy.experience]}</Caption>
        </ItemWrapper>
      </div>
      {status && <Caption color={mapStatusToColor[status]}>{status}</Caption>}
    </VacancyInfo>
  </Wrapper>
);

export { VacancyItem };
