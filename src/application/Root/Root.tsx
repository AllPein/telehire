import { AuthenticatedLayout } from '@/application/AuthenticatedLayout/AuthenticatedLayout';
import { CreateCompanyPage } from '@/pages/CreateCompanyPage/CreateCompanyPage';
import { MainPage } from '@/pages/MainPage/MainPage';
import { VacancyListPage } from '@/pages/VacancyListPage/VacancyListPage';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const routes = [
  {
    path: '/',
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
      {routes.map((route) => (
        <Route key={route.path} exact {...route}>
          {route.children}
        </Route>
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
