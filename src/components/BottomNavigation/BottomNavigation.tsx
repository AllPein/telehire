import JobIcon from '@/assets/job.svg';
import ProfileIcon from '@/assets/profile.svg';
import { history } from '@/utils/history';
import { Wrapper } from './BottomNavigation.styles';

const BottomNavigation = () => {
  return (
    <Wrapper>
      <img src={JobIcon} onClick={() => history.push('/vacancies')} />
      <img src={ProfileIcon} />
      <img src={ProfileIcon} onClick={() => history.push('/profile')} />
    </Wrapper>
  );
};

export { BottomNavigation };
