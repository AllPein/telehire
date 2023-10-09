import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { FC } from 'react';
import { Route } from 'react-router-dom';

type Props = {
  exact?: boolean;
  children: JSX.Element;
  path: string;
  render?: () => any;
};

const ErrorBoundRoute: FC<Props> = ({ exact, children, path, render }) => (
  <ErrorBoundary>
    <Route exact={exact} path={path} render={render}>
      {children}
    </Route>
  </ErrorBoundary>
);

export { ErrorBoundRoute };
