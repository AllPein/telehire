import {
  Body,
  Body2,
  Caption,
} from '@/components/Typography/Typography.styles';
import { Resume } from '@/models/Resume';
import { CurrencyToSymbol } from '@/models/Vacancy';
import { FC } from 'react';
import { ItemWrapper, Wrapper } from './ResumeItem.styles';

type Props = {
  resume: Resume;
  onClick: (resumeId: number) => void;
};

const ResumeItem: FC<Props> = ({ resume, onClick }) => (
  <Wrapper onClick={() => onClick(resume.id)}>
    <Body2>{resume.position}</Body2>

    <ItemWrapper>
      <Body>
        {resume.salary}
        {CurrencyToSymbol[resume.currency]}
      </Body>
    </ItemWrapper>

    <ItemWrapper>
      <Caption color="#ffffffb2">
        {resume.user.firstName} {resume.user.lastName}
      </Caption>
    </ItemWrapper>
  </Wrapper>
);

export { ResumeItem };
