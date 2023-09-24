import { MainPage } from '@/pages/MainPage/MainPage';
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const REDIRECT_PATH = '/main';

const routes = [
  {
    path: '/main',
    children: <MainPage />,
  },
];

const Root = () => {
  const renderRoot = () => (
    <Switch>
      <Redirect exact from="/" to={REDIRECT_PATH} />
      {routes.map((route) => (
        <Route key={route.path} exact {...route} />
      ))}
    </Switch>
  );

  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Route path="/" render={renderRoot} />
    </Suspense>
  );
};

export { Root };
