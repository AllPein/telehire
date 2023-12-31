import { AuthenticatedLayout } from '@/application/AuthenticatedLayout/AuthenticatedLayout';
import { ErrorBoundRoute } from '@/components/ErrorBoundRoute/ErrorBoundRoute';
import { Spinner } from '@/components/Spinner/Spinner';
import { lazy } from '@/utils/lazy';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const VacancyPage = lazy(
  () => import('@/pages/VacancyPage/VacancyPage'),
  'VacancyPage',
);

const MainPage = lazy(() => import('@/pages/MainPage/MainPage'), 'MainPage');
const AcceptInvitePage = lazy(
  () => import('@/pages/AcceptInvitePage/AcceptInvitePage'),
  'AcceptInvitePage',
);
const AppliesPage = lazy(
  () => import('@/pages/AppliesPage/AppliesPage'),
  'AppliesPage',
);
const ResumePage = lazy(
  () => import('@/pages/ResumePage/ResumePage'),
  'ResumePage',
);
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
const CandidateListPage = lazy(
  () => import('@/pages/CandidateListPage/CandidateListPage'),
  'CandidateListPage',
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
    path: '/resumes/:resumeId',
    children: <ResumePage />,
  },
  {
    path: '/applies',
    children: <AppliesPage />,
  },
  {
    path: '/vacancies',
    children: <VacancyListPage />,
  },
  {
    path: '/candidates/:vacancyId',
    children: <CandidateListPage />,
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
    path: '/companies/:companyId',
    children: <CompanyInfoPage />,
  },
  {
    path: '/accept-invite/:hash',
    children: <AcceptInvitePage />,
  },
];

const Root = () => {
  const renderRoot = () => (
    <AuthenticatedLayout>
      <Switch>
        {routes.map((route) => (
          <ErrorBoundRoute key={route.path} exact {...route}>
            {route.children}
          </ErrorBoundRoute>
        ))}
      </Switch>
    </AuthenticatedLayout>
  );

  return (
    <Suspense fallback={<Spinner />}>
      <ErrorBoundRoute path="/" render={renderRoot} />
    </Suspense>
  );
};

export { Root };
