import { CompanyList } from '@/components/CompanyList/CompanyList';
import { Company } from '@/components/models/Company';
import { CompanyVolumeEnum } from '@/enums/Company';
import { history } from '@/utils/history';
import { useEffect } from 'react';

const companies: Company[] = [
  {
    name: 'Google',
    description: 'Small company',
    photoUrl:
      'https://i.pinimg.com/originals/fb/52/e3/fb52e39c5910bdbcc3b98d58d6ca6944.webp',
    volume: CompanyVolumeEnum.High,
    id: '1',
  },
  {
    name: 'Газпром',
    id: '2',
    volume: CompanyVolumeEnum.High,
    description: 'Small company',
    photoUrl: 'https://hhcdn.ru/ichameleon/169297.svg',
  },
];

const hasCompanies = true;

const EmployerPage = () => {
  useEffect(() => {
    if (!hasCompanies) {
      history.push('/create-company');
    }
  }, []);

  return <CompanyList companies={companies} />;
};

export { EmployerPage };
