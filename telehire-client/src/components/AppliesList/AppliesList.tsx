import { Caption, Heading6 } from '@/components/Typography/Typography.styles';
import { VacancyItem } from '@/components/VacancyItem/VacancyItem';
import { history } from '@/utils/history';
import { FC } from 'react';
import { Wrapper } from './AppliesList.styles';
import { BigWrapper, SmallWrapper } from '@/components/Layout/Layout.styles';

type Props = {
  applies: any[];
};

const AppliesList: FC<Props> = ({ applies }) => {
  return (
    <Wrapper>
      <SmallWrapper center>
        <Heading6>Vacancies you applied for</Heading6>
      </SmallWrapper>
      <>
        {applies.length ? (
          applies.map((apply) => (
            <VacancyItem
              key={apply.id}
              vacancy={apply.vacancy}
              status={apply.status}
              onClick={() => history.push('/vacancies/' + apply.vacancy.id)}
            />
          ))
        ) : (
          <BigWrapper center>
            <Caption>You haven't applied to any vacancies yet</Caption>
          </BigWrapper>
        )}
      </>
    </Wrapper>
  );
};

export { AppliesList };
