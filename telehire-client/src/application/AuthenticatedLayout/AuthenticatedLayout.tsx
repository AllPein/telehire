import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';
import { selectUser } from '@/store/auth/UserSelectors';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Wrapper } from './AuthenticatedLayout.styles';

type Props = {
  children: ReactNode;
};

const AuthenticatedLayout: FC<Props> = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user?.id || !user?.loggedInAs) {
    return <>{children}</>;
  }

  return (
    <>
      <Wrapper>{children}</Wrapper>
      <BottomNavigation />
    </>
  );
};

export { AuthenticatedLayout };
