import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AuthenticatedLayout: FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  );
};

export { AuthenticatedLayout };
