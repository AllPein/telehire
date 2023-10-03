import { Spinner } from '@/components/Spinner/Spinner';
import { VacancyList } from '@/components/VacancyList/VacancyList';
import { selectUser } from '@/store/auth/UserSelectors';
import { FeedAction } from '@/store/feed/FeedActions';
import { selectVacancies } from '@/store/feed/FeedSelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const VacancyListPage = () => {
  const dispatch = useDispatch();
  const vacancies = useSelector(selectVacancies);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(FeedAction.getVacancies(user?.currentResumeId));
  }, [user]);

  return <>{vacancies ? <VacancyList vacancies={vacancies} /> : <Spinner />}</>;
};

export { VacancyListPage };
