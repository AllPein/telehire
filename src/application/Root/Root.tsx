import { AuthenticatedLayout } from '@/application/AuthenticatedLayout/AuthenticatedLayout';
import { lazy } from '@/utils/lazy';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const VacancyPage = lazy(
  () => import('@/pages/VacancyPage/VacancyPage'),
  'VacancyPage',
);

const MainPage = lazy(() => import('@/pages/MainPage/MainPage'), 'MainPage');
const ProfilePage = lazy(
  () => import('@/pages/ProfilePage/ProfilePage'),
  'ProfilePage',
);
const EmployerPage = lazy(
  () => import('@/pages/EmployerPage/EmployerPage'),
  'EmployerPage',
);
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
    path: '/profile',
    children: (
      <AuthenticatedLayout>
        <ProfilePage />
      </AuthenticatedLayout>
    ),
  },
  {
    path: '/create-company',
    children: <CreateCompanyPage />,
  },
  {
    path: '/employer',
    children: <EmployerPage />,
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
