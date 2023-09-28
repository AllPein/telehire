import { Avatar } from '@/components/Avatar/Avatar';
import { Body, Caption } from '@/components/Typography/Typography.styles';
import { Company } from '@/components/models/Company';
import { CompanyVolumeToLabel } from '@/enums/Company';
import { FC } from 'react';
import { CompanyWrapper } from './CompanyItem.styles';

type Props = {
  company: Company;
};

const CompanyItem: FC<Props> = ({ company }) => {
  return (
    <CompanyWrapper>
      <Avatar src={company.photo_url} />
      <Body>{company.name}</Body>
      <Caption color="#FFFFFFB2">
        {CompanyVolumeToLabel[company.volume]}
      </Caption>
    </CompanyWrapper>
  );
};

export { CompanyItem };
