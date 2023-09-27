import { VacancyInfo } from '@/components/VacancyInfo/VacancyInfo';
import { useParams } from 'react-router-dom';

const VacancyPage = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();

  return (
    <>
      <VacancyInfo />
    </>
  );
};

export { VacancyPage };
