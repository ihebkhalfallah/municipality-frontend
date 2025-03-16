import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import DemandeView from 'src/views/apps/demande/demande-view';
import { getToken, getUserRole } from 'src/services/authService';
import EventView from 'src/views/apps/event/event-view';
import AuthorizationView from 'src/views/apps/authorization/AuthorizationView';
import UsersView, { USER_ROLE } from 'src/views/apps/users/UserView';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
// const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));

/* ****Apps***** */

const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));

// forms

const FormWizard = Loadable(lazy(() => import('../views/forms/FormWizard')));

// pages

// charts
const AreaChart = Loadable(lazy(() => import('../views/charts/AreaChart')));
const CandlestickChart = Loadable(lazy(() => import('../views/charts/CandlestickChart')));
const ColumnChart = Loadable(lazy(() => import('../views/charts/ColumnChart')));
const DoughnutChart = Loadable(lazy(() => import('../views/charts/DoughnutChart')));
const GredientChart = Loadable(lazy(() => import('../views/charts/GredientChart')));
const RadialbarChart = Loadable(lazy(() => import('../views/charts/RadialbarChart')));
const LineChart = Loadable(lazy(() => import('../views/charts/LineChart')));

// tables
const BasicTable = Loadable(lazy(() => import('../views/tables/BasicTable')));
const EnhanceTable = Loadable(lazy(() => import('../views/tables/EnhanceTable')));
const PaginationTable = Loadable(lazy(() => import('../views/tables/PaginationTable')));
const FixedHeaderTable = Loadable(lazy(() => import('../views/tables/FixedHeaderTable')));
const CollapsibleTable = Loadable(lazy(() => import('../views/tables/CollapsibleTable')));
const SearchTable = Loadable(lazy(() => import('../views/tables/SearchTable')));

// widget
const WidgetCards = Loadable(lazy(() => import('../views/widgets/cards/WidgetCards')));
const WidgetBanners = Loadable(lazy(() => import('../views/widgets/banners/WidgetBanners')));
const WidgetCharts = Loadable(lazy(() => import('../views/widgets/charts/WidgetCharts')));

// authentication
// const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage

const PrivateRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const token = getToken();
  const userRole = getUserRole();

  if (!token || !userRole) {
    return <Navigate to="/auth/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    if (userRole === USER_ROLE.PERMISSION_ADMIN) {
      return <Navigate to="/dashboards/events" />;
    } else if (userRole === USER_ROLE.CONTESTATION_ADMIN) {
      return <Navigate to="/dashboards/demandes" />;
    } else if (userRole === USER_ROLE.DEMANDE_ADMIN) {
      return <Navigate to="/dashboards/authorizations" />;
    }
    return <Navigate to="/dashboards/demandes" />;
  }

  return children;
};

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboards/demandes" /> },
      // {
      //   path: '/dashboards/modern',
      //   exact: true,
      //   element: (
      //     <PrivateRoute>
      //       <ModernDash />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: '/dashboards/demandes',
        exact: true,
        element: (
          <PrivateRoute allowedRoles={['SUPER_ADMIN', 'CONTESTATION_ADMIN']}>
            <DemandeView />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboards/events',
        exact: true,
        element: (
          <PrivateRoute allowedRoles={['SUPER_ADMIN', 'PERMISSION_ADMIN']}>
            <EventView />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboards/authorizations',
        exact: true,
        element: (
          <PrivateRoute allowedRoles={['SUPER_ADMIN', 'DEMANDE_ADMIN']}>
            <AuthorizationView />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboards/users',
        exact: true,
        element: (
          <PrivateRoute allowedRoles={['SUPER_ADMIN']}>
            <UsersView />
          </PrivateRoute>
        ),
      },
      {
        path: '/user-profile',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/basic',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <BasicTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/enhanced',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <EnhanceTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/pagination',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <PaginationTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/fixed-header',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <FixedHeaderTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/collapsible',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <CollapsibleTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/search',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <SearchTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-wizard',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <FormWizard />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/area-chart',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <AreaChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/line-chart',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <LineChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/gredient-chart',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <GredientChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/candlestick-chart',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <CandlestickChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/column-chart',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <ColumnChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/doughnut-pie-chart',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <DoughnutChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/radialbar-chart',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <RadialbarChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/widgets/cards',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <WidgetCards />
          </PrivateRoute>
        ),
      },
      {
        path: '/widgets/banners',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <WidgetBanners />
          </PrivateRoute>
        ),
      },
      {
        path: '/widgets/charts',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <WidgetCharts />
          </PrivateRoute>
        ),
      },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      // { path: '/auth/login', element: <Login /> },
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
