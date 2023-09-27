import FilterIcon from '@/assets/filter.svg';
import { Button } from '@/components/Button/Button';
import { Search } from '@/components/Search/Search';
import { Heading6 } from '@/components/Typography/Typography.styles';
import { VacancyItem } from '@/components/VacancyList/components/VacancyItem';
import { Vacancy } from '@/components/models/Vacancy';
import { ExperienceEnum } from '@/enums/Vacancy';
import { useTelegram } from '@/hooks/useTelegram';
import { useMemo, useState } from 'react';
import { HeadingWrapper, InputWrapper, Wrapper } from './VacancyList.styles';

const vacanciesBase: Vacancy[] = [
  {
    title: 'React developer',
    salary: '1000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '2000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '3000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '4000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '5000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
  {
    title: 'React developer',
    salary: '6000$',
    country: 'Germany',
    city: 'Berlin',
    company: 'Google',
    experience: ExperienceEnum.Senior,
  },
];
const VacancyList = () => {
  const { tg } = useTelegram();

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleFilterClick = () => {
    tg.showPopup({
      title: 'Filter',
      message: 'AAAAAA',
    });
  };

  const vacancies = useMemo(() => {
    return vacanciesBase.filter((vacancy) =>
      vacancy.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue]);

  return (
    <Wrapper>
      <InputWrapper>
        <Search onSearch={handleSearch} placeholder="Search.." />
        <Button onClick={handleFilterClick}>
          <img src={FilterIcon} alt="" />
        </Button>
      </InputWrapper>
      <HeadingWrapper>
        <Heading6>Vacancy list for you</Heading6>
      </HeadingWrapper>
      {vacancies.map((vacancy) => (
        <VacancyItem
          key={vacancy.country + vacancy.title + vacancy.salary}
          vacancy={vacancy}
        />
      ))}
    </Wrapper>
  );
};

export { VacancyList };
