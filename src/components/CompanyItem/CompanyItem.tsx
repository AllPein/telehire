import { Avatar } from '@/components/Avatar/Avatar';
import { Body, Caption } from '@/components/Typography/Typography.styles';
import { CompanyVolumeToLabel } from '@/enums/Company';
import { Company } from '@/models/Company';
import { FC } from 'react';
import { CompanyWrapper } from './CompanyItem.styles';

type Props = {
  company?: Company;
  onClick?: () => any;
};

const CompanyItem: FC<Props> = ({ company, onClick }) => {
  if (!company) {
    return null;
  }

  return (
    <CompanyWrapper onClick={onClick}>
      <Avatar src={company.photoUrl} />
      <Body>{company.name}</Body>
      <Caption>{CompanyVolumeToLabel[company.volume]}</Caption>
    </CompanyWrapper>
  );
};

export { CompanyItem };
