import FilterIcon from '@/assets/filter.svg';
import { Button } from '@/components/Button/Button';
import { Search } from '@/components/Search/Search';
import { Heading6 } from '@/components/Typography/Typography.styles';
import { VacancyItem } from '@/components/VacancyItem/VacancyItem';
import { useTelegram } from '@/hooks/useTelegram';
import { ShortVacancy } from '@/models/Vacancy';
import { history } from '@/utils/history';
import { FC, useMemo, useState } from 'react';
import {
  AppContainer,
  HeadingWrapper,
  InputWrapper,
  Wrapper,
} from './VacancyList.styles';

type Props = {
  vacancies: ShortVacancy[];
};

const VacancyList: FC<Props> = ({ vacancies }) => {
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

  const vacancyList = useMemo(() => {
    return vacancies.filter((vacancy) =>
      vacancy.position.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [searchValue]);

  const handleOpenVacancy = (vacancyId: number) => {
    history.push('/vacancies/' + vacancyId);
  };

  return (
    <AppContainer>
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
        {vacancyList.map((vacancy) => (
          <VacancyItem
            key={vacancy.id}
            vacancy={vacancy}
            onClick={handleOpenVacancy}
          />
        ))}
      </Wrapper>
    </AppContainer>
  );
};

export { VacancyList };
