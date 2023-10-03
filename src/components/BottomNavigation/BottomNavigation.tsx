import CompanyIcon from '@/assets/company.svg';
import JobIcon from '@/assets/job.svg';
import ProfileIcon from '@/assets/profile.svg';
import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { selectUser } from '@/store/auth/UserSelectors';
import { history } from '@/utils/history';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ImgWrapper, Wrapper } from './BottomNavigation.styles';

const locationToValue = {
  '/vacancies': 'job',
  '/candidates/': 'candidates',
  '/company/': 'company',
  '/profile': 'profile',
  '/applies': 'applies',
};

const BottomNavigation = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const location = useLocation();

  const user = useSelector(selectUser);

  useEffect(() => {
    const key = Object.keys(locationToValue).find((key) =>
      location.pathname.includes(key),
    );

    if (key) {
      setActiveItem(locationToValue[key as keyof typeof locationToValue]);
    }
  }, [location]);

  const handleChangeLocation = (location: string, params?: any) => {
    setActiveItem(locationToValue[location as keyof typeof locationToValue]);
    history.push(location + (params ?? ''));
  };

  return (
    <Wrapper>
      {user?.loggedInAs === 'company' ? (
        <ImgWrapper
          active={activeItem === 'candidates'}
          onClick={() => handleChangeLocation('/candidates/', 'all')}
        >
          <img src={JobIcon} />
        </ImgWrapper>
      ) : (
        <ImgWrapper
          active={activeItem === 'job'}
          onClick={() => handleChangeLocation('/vacancies')}
        >
          <img src={JobIcon} />
        </ImgWrapper>
      )}

      {user?.loggedInAs === 'company' ? (
        <ImgWrapper
          active={activeItem === 'company'}
          onClick={() =>
            handleChangeLocation(
              '/company/',
              localStorage.getItem(CURRENT_COMPANY_ID),
            )
          }
        >
          <img src={CompanyIcon} />
        </ImgWrapper>
      ) : (
        <ImgWrapper
          active={activeItem === 'applies'}
          onClick={() => handleChangeLocation('/applies')}
        >
          <img src={CompanyIcon} />
        </ImgWrapper>
      )}
      <ImgWrapper
        active={activeItem === 'profile'}
        onClick={() => handleChangeLocation('/profile')}
      >
        <img src={ProfileIcon} />
      </ImgWrapper>
    </Wrapper>
  );
};

export { BottomNavigation };
