import { AuthenticatedLayout } from '@/application/AuthenticatedLayout/AuthenticatedLayout';
import { Spinner } from '@/components/Spinner/Spinner';
import { lazy } from '@/utils/lazy';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const VacancyPage = lazy(
  () => import('@/pages/VacancyPage/VacancyPage'),
  'VacancyPage',
);

const MainPage = lazy(() => import('@/pages/MainPage/MainPage'), 'MainPage');
const CompanyInfoPage = lazy(
  () => import('@/pages/CompanyInfoPage/CompanyInfoPage'),
  'CompanyInfoPage',
);
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
const CreateResumePage = lazy(
  () => import('@/pages/CreateResumePage/CreateResumePage'),
  'CreateResumePage',
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
    path: '/create-cv',
    children: <CreateResumePage />,
  },
  {
    path: '/employer',
    children: <EmployerPage />,
  },
  {
    path: '/company/:companyId',
    children: <CompanyInfoPage />,
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
    <Suspense fallback={<Spinner />}>
      <Route path="/" render={renderRoot} />
    </Suspense>
  );
};

export { Root };
