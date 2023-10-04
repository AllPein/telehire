import { Heading6 } from '@/components/Typography/Typography.styles';
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
          <div key={apply.id}></div>
        ))}
      </div>
    </Wrapper>
  );
};

export { AppliesList };
