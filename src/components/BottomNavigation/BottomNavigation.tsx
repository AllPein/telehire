import CompanyIcon from '@/assets/company.svg';
import JobIcon from '@/assets/job.svg';
import ProfileIcon from '@/assets/profile.svg';
import { selectUser } from '@/store/auth/UserSelectors';
import { history } from '@/utils/history';
import { useSelector } from 'react-redux';
import { Wrapper } from './BottomNavigation.styles';

const BottomNavigation = () => {
  const user = useSelector(selectUser);

  return (
    <Wrapper>
      <img src={JobIcon} onClick={() => history.push('/vacancies')} />
      {user?.loggedInAs === 'company' ? (
        <img src={CompanyIcon} />
      ) : (
        <img src={ProfileIcon} />
      )}
      <img src={ProfileIcon} onClick={() => history.push('/profile')} />
    </Wrapper>
  );
};

export { BottomNavigation };
