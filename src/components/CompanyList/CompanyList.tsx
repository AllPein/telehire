import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button/Button';
import {
  Body,
  Caption,
  Heading6,
} from '@/components/Typography/Typography.styles';
import { Company } from '@/components/models/Company';
import { CompanyVolumeToLabel } from '@/enums/Company';
import { history } from '@/utils/history';
import { FC } from 'react';
import { CompanyWrapper, HeadingWrapper, Wrapper } from './CompanyList.styles';

type Props = {
  companies: Company[];
};

const CompanyList: FC<Props> = ({ companies }) => {
  return (
    <Wrapper>
      <HeadingWrapper>
        <Heading6>Log in as</Heading6>
      </HeadingWrapper>
      {companies.map((company) => (
        <CompanyWrapper key={company.id}>
          <Avatar src={company.photo_url} />
          <Body>{company.name}</Body>
          <Caption color="#FFFFFFB2">
            {CompanyVolumeToLabel[company.volume]}
          </Caption>
        </CompanyWrapper>
      ))}
      <HeadingWrapper>
        <Heading6>Or</Heading6>
      </HeadingWrapper>
      <Button onClick={() => history.push('/create-company')}>
        Create company
      </Button>
    </Wrapper>
  );
};

export { CompanyList };
