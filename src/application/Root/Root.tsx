import { AuthenticatedLayout } from '@/application/AuthenticatedLayout/AuthenticatedLayout';
import { lazy } from '@/utils/lazy';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const VacancyPage = lazy(
  () => import('@/pages/VacancyPage/VacancyPage'),
  'VacancyPage',
);

const MainPage = lazy(() => import('@/pages/MainPage/MainPage'), 'MainPage');
const CreateCompanyPage = lazy(
  () => import('@/pages/CreateCompanyPage/CreateCompanyPage'),
  'CreateCompanyPage',
);
const VacancyListPage = lazy(
  () => import('@/pages/VacancyListPage/VacancyListPage'),
  'VacancyListPage',
);

const routes = [
  {
    path: '/',
    children: <MainPage />,
  },
  {
    path: '/vacancy/:vacancyId',
    children: <VacancyPage />,
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
