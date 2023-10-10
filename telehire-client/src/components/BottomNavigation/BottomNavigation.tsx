import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { selectUser } from '@/store/auth/UserSelectors';
import { history } from '@/utils/history';
import {
  mdiAccountCircleOutline,
  mdiAccountMultiple,
  mdiBriefcaseOutline,
  mdiDomain,
  mdiEmailNewsletter,
} from '@mdi/js';
import { Icon } from '@mdi/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ImgWrapper, Wrapper } from './BottomNavigation.styles';

const locationToValue = {
  '/vacancies': 'job',
  '/candidates/': 'candidates',
  '/companies/': 'company',
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
          <Icon path={mdiAccountMultiple} size={1} />
        </ImgWrapper>
      ) : (
        <ImgWrapper
          active={activeItem === 'job'}
          onClick={() => handleChangeLocation('/vacancies')}
        >
          <Icon path={mdiBriefcaseOutline} size={1} />
        </ImgWrapper>
      )}

      {user?.loggedInAs === 'company' ? (
        <ImgWrapper
          active={activeItem === 'company'}
          onClick={() =>
            handleChangeLocation(
              '/companies/',
              localStorage.getItem(CURRENT_COMPANY_ID),
            )
          }
        >
          <Icon path={mdiDomain} size={1} />
        </ImgWrapper>
      ) : (
        <ImgWrapper
          active={activeItem === 'applies'}
          onClick={() => handleChangeLocation('/applies')}
        >
          <Icon path={mdiEmailNewsletter} size={1} />
        </ImgWrapper>
      )}
      <ImgWrapper
        active={activeItem === 'profile'}
        onClick={() => handleChangeLocation('/profile')}
      >
        <Icon path={mdiAccountCircleOutline} size={1} />
      </ImgWrapper>
    </Wrapper>
  );
};

export { BottomNavigation };
