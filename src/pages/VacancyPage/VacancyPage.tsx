import { Spinner } from '@/components/Spinner/Spinner';
import { VacancyInfo } from '@/components/VacancyInfo/VacancyInfo';
import { VacancyAction } from '@/store/vacancy/VacancyActions';
import { selectCurrentVacancy } from '@/store/vacancy/VacancySelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const VacancyPage = () => {
  const { vacancyId } = useParams<{ vacancyId: string }>();
  const dispatch = useDispatch();
  const currentVacancy = useSelector(selectCurrentVacancy);

  useEffect(() => {
    dispatch(VacancyAction.getVacancy(Number(vacancyId)));

    return () => {
      dispatch(VacancyAction.setVacancy(null));
    };
  }, [vacancyId]);

  return (
    <>
      {currentVacancy ? <VacancyInfo vacancy={currentVacancy} /> : <Spinner />}
    </>
  );
};

export { VacancyPage };
