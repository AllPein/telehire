import { ResumeItem } from '@/components/CandidateItem/ResumeItem';
import { Search } from '@/components/Search/Search';
import { Caption, Heading6 } from '@/components/Typography/Typography.styles';
import { Resume } from '@/models/Resume';
import { history } from '@/utils/history';
import { FC, useMemo, useState } from 'react';
import {
  AppContainer,
  HeadingWrapper,
  InputWrapper,
  Wrapper,
} from './CandidatesList.styles';
import { BigWrapper } from '../Layout/Layout.styles';

type Props = {
  candidates: Resume[];
};

const CandidatesList: FC<Props> = ({ candidates }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const candidateList = useMemo(() => {
    return candidates.filter((candidate) =>
      candidate.position.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue, candidates]);

  const handleOpenResume = (resumeId: number) => {
    history.push('/resumes/' + resumeId);
  };

  return (
    <AppContainer>
      <Wrapper>
        <InputWrapper>
          <Search onSearch={handleSearch} placeholder="Search.." />
        </InputWrapper>
        <HeadingWrapper>
          <Heading6>Candidates</Heading6>
        </HeadingWrapper>
        {candidateList.length ? (
          candidateList.map((candidate) => (
            <ResumeItem
              key={candidate.id}
              resume={candidate}
              onClick={handleOpenResume}
            />
          ))
        ) : (
          <BigWrapper center>
            <Caption>No candidates</Caption>
          </BigWrapper>
        )}
      </Wrapper>
    </AppContainer>
  );
};

export { CandidatesList };
