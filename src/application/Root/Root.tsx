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
const CreateVacancyPage = lazy(
  () => import('@/pages/CreateVacancyPage/CreateVacancyPage'),
  'CreateVacancyPage',
);
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
    path: '/vacancies/:vacancyId',
    children: <VacancyPage />,
  },
  {
    path: '/vacancies',
    children: <VacancyListPage />,
  },
  {
    path: '/profile',
    children: <ProfilePage />,
  },
  {
    path: '/create-company',
    children: <CreateCompanyPage />,
  },
  {
    path: '/create-resume',
    children: <CreateResumePage />,
  },
  {
    path: '/create-vacancy/:companyId',
    children: <CreateVacancyPage />,
  },
  {
    path: '/employer',
    children: <EmployerPage />,
  },
  {
    path: '/company/:companyId',
    children: <CompanyInfoPage />,
  },
  {
    path: '/manage-company/:companyId',
    children: <CompanyInfoPage />,
  },
];

const Root = () => {
  const renderRoot = () => (
    <AuthenticatedLayout>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} exact {...route}>
            {route.children}
          </Route>
        ))}
      </Switch>
    </AuthenticatedLayout>
  );

  return (
    <Suspense fallback={<Spinner />}>
      <Route path="/" render={renderRoot} />
    </Suspense>
  );
};

export { Root };
