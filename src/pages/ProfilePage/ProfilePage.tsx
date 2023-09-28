import { Profile } from '@/components/Profile/Profile';
import { CV } from '@/components/models/CV';
import { useBackButton } from '@/hooks/useBackButton';
import { history } from '@/utils/history';

const cvs: CV[] = [];

const ProfilePage = () => {
  useBackButton({
    onClick: () => history.goBack(),
  });

  return <Profile cvs={cvs} />;
};

export { ProfilePage };
