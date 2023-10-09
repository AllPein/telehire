import { Heading6 } from '@/components/Typography/Typography.styles';
import { VacancyItem } from '@/components/VacancyItem/VacancyItem';
import { history } from '@/utils/history';
import { FC } from 'react';
import { Wrapper } from './AppliesList.styles';

type Props = {
  applies: any[];
};

const AppliesList: FC<Props> = ({ applies }) => {
  return (
    <Wrapper>
      <Heading6>Vacancies you applied for</Heading6>
      <div>
        {applies.map((apply) => (
          <VacancyItem
            key={apply.id}
            vacancy={apply.vacancy}
            status={apply.status}
            onClick={() => history.push('/vacancies/' + apply.vacancy.id)}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export { AppliesList };
