import { Profile } from '@/components/Profile/Profile';
import { Spinner } from '@/components/Spinner/Spinner';
import { selectUser } from '@/store/auth/UserSelectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector(selectUser);

  const renderProfile = useMemo(() => {
    if (!user) {
      return false;
    }

    if (user?.loggedInAs === 'company') {
      return user?.companyList;
    }

    if (user?.loggedInAs === 'applicant') {
      return user?.resumes;
    }

    return false;
  }, [user]);

  return <>{renderProfile ? <Profile user={user!} /> : <Spinner />}</>;
};

export { ProfilePage };
