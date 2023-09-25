import { AuthenticatedLayout } from '@/application/AuthenticatedLayout/AuthenticatedLayout';
import { CreateCompanyPage } from '@/pages/CreateCompanyPage/CreateCompanyPage';
import { MainPage } from '@/pages/MainPage/MainPage';
import { VacancyListPage } from '@/pages/VacancyListPage/VacancyListPage';
import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const REDIRECT_PATH = '/main';

const routes = [
  {
    path: '/main',
    children: <MainPage />,
  },
  {
    path: '/vacancies',
    children: (
      <AuthenticatedLayout>
        <VacancyListPage />
      </AuthenticatedLayout>
    ),
  },
  {
    path: '/create-company',
    children: <CreateCompanyPage />,
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
