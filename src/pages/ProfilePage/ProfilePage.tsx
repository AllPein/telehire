import { Profile } from '@/components/Profile/Profile';
import { CV } from '@/components/models/CV';
import { useBackButton } from '@/hooks/useBackButton';

const cvs: CV[] = [];

const ProfilePage = () => {
  useBackButton();

  return <Profile cvs={cvs} />;
};

export { ProfilePage };
