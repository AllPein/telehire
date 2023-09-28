import { VacancyList } from '@/components/VacancyList/VacancyList';
import { useBackButton } from '@/hooks/useBackButton';
import { history } from '@/utils/history';
import { AppContainer } from './VacancyListPage.styles';

const VacancyListPage = () => {
  const handleBackClick = () => {
    history.push('/');
  };

  useBackButton(handleBackClick);

  return (
    <AppContainer>
      <VacancyList />
    </AppContainer>
  );
};

export { VacancyListPage };
