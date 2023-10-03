import { Resume } from '@/models/Resume';
import { FC } from 'react';

type Props = {
  candidates: Resume[];
};

const CandidatesList: FC<Props> = ({ candidates }) => {
  return (
    <div>
      {candidates.map((candidate) => (
        <p key={candidate.id}>{candidate.position}</p>
      ))}
    </div>
  );
};

export { CandidatesList };
