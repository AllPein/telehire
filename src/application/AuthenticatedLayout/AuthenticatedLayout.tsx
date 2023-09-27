import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';
import { FC, ReactNode } from 'react';
import { Wrapper } from './AuthenticatedLayout.styles';

type Props = {
  children: ReactNode;
};

const AuthenticatedLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Wrapper>{children}</Wrapper>
      <BottomNavigation />
    </>
  );
};

export { AuthenticatedLayout };
