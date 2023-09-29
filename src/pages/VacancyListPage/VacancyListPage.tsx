import { Spinner } from '@/components/Spinner/Spinner';
import { VacancyList } from '@/components/VacancyList/VacancyList';
import { selectUser } from '@/store/auth/UserSelectors';
import { VacancyAction } from '@/store/vacancy/VacancyActions';
import { selectVacancies } from '@/store/vacancy/VacancySelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const VacancyListPage = () => {
  const dispatch = useDispatch();
  const vacancies = useSelector(selectVacancies);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.resumes) {
      dispatch(VacancyAction.getVacancies(user.resumes?.[0].id));
    }
  }, [user]);

  return <>{vacancies ? <VacancyList vacancies={vacancies} /> : <Spinner />}</>;
};

export { VacancyListPage };
