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

const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Ecommerce = Loadable(lazy(() => import('../views/apps/eCommerce/Ecommerce')));
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceDetail')));
const EcomProductList = Loadable(lazy(() => import('../views/apps/eCommerce/EcomProductList')));
const EcomProductCheckout = Loadable(
  lazy(() => import('../views/apps/eCommerce/EcommerceCheckout')),
);
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers')));
const Friends = Loadable(lazy(() => import('../views/apps/user-profile/Friends')));
const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery')));

// ui components
const MuiAlert = Loadable(lazy(() => import('../views/ui-components/MuiAlert')));
const MuiAccordion = Loadable(lazy(() => import('../views/ui-components/MuiAccordion')));
const MuiAvatar = Loadable(lazy(() => import('../views/ui-components/MuiAvatar')));
const MuiChip = Loadable(lazy(() => import('../views/ui-components/MuiChip')));
const MuiDialog = Loadable(lazy(() => import('../views/ui-components/MuiDialog')));
const MuiList = Loadable(lazy(() => import('../views/ui-components/MuiList')));
const MuiPopover = Loadable(lazy(() => import('../views/ui-components/MuiPopover')));
const MuiRating = Loadable(lazy(() => import('../views/ui-components/MuiRating')));
const MuiTabs = Loadable(lazy(() => import('../views/ui-components/MuiTabs')));
const MuiTooltip = Loadable(lazy(() => import('../views/ui-components/MuiTooltip')));
const MuiTransferList = Loadable(lazy(() => import('../views/ui-components/MuiTransferList')));
const MuiTypography = Loadable(lazy(() => import('../views/ui-components/MuiTypography')));

// form elements
const MuiAutoComplete = Loadable(
  lazy(() => import('../views/forms/form-elements/MuiAutoComplete')),
);
const MuiButton = Loadable(lazy(() => import('../views/forms/form-elements/MuiButton')));
const MuiCheckbox = Loadable(lazy(() => import('../views/forms/form-elements/MuiCheckbox')));
const MuiRadio = Loadable(lazy(() => import('../views/forms/form-elements/MuiRadio')));
const MuiSlider = Loadable(lazy(() => import('../views/forms/form-elements/MuiSlider')));
const MuiDateTime = Loadable(lazy(() => import('../views/forms/form-elements/MuiDateTime')));
const MuiSwitch = Loadable(lazy(() => import('../views/forms/form-elements/MuiSwitch')));

// forms
const FormLayouts = Loadable(lazy(() => import('../views/forms/FormLayouts')));
const FormCustom = Loadable(lazy(() => import('../views/forms/FormCustom')));
const FormHorizontal = Loadable(lazy(() => import('../views/forms/FormHorizontal')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical')));
const FormWizard = Loadable(lazy(() => import('../views/forms/FormWizard')));
const FormValidation = Loadable(lazy(() => import('../views/forms/FormValidation')));
const QuillEditor = Loadable(lazy(() => import('../views/forms/quill-editor/QuillEditor')));

// pages
const RollbaseCASL = Loadable(lazy(() => import('../views/pages/rollbaseCASL/RollbaseCASL')));
const Treeview = Loadable(lazy(() => import('../views/pages/treeview/Treeview')));
const Faq = Loadable(lazy(() => import('../views/pages/faq/Faq')));
const Pricing = Loadable(lazy(() => import('../views/pages/pricing/Pricing')));
const AccountSetting = Loadable(
  lazy(() => import('../views/pages/account-setting/AccountSetting')),
);

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
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

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
        path: '/apps/notes',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Notes />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/ecommerce/shop',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Ecommerce />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/ecommerce/eco-product-list',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <EcomProductList />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/ecommerce/eco-checkout',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <EcomProductCheckout />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/ecommerce/detail/:id',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <EcommerceDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/followers',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Followers />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/friends',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Friends />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/gallery',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Gallery />
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
        path: '/apps/calendar',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Calendar />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/alert',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiAlert />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/accordion',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiAccordion />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/avatar',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiAvatar />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/chip',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiChip />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/dialog',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiDialog />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/list',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiList />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/popover',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiPopover />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/rating',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiRating />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/tabs',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiTabs />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/tooltip',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiTooltip />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/transfer-list',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiTransferList />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/typography',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiTypography />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/casl',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <RollbaseCASL />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/treeview',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Treeview />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/pricing',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Pricing />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/faq',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <Faq />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/account-settings',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <AccountSetting />
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
        path: '/forms/form-elements/autocomplete',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiAutoComplete />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/button',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiButton />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/checkbox',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiCheckbox />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/radio',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiRadio />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/slider',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiSlider />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/date-time',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiDateTime />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/switch',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiSwitch />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/switch',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <MuiSwitch />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-layouts',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <FormLayouts />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-custom',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <FormCustom />
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
        path: '/forms/form-validation',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <FormValidation />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-horizontal',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <FormHorizontal />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-vertical',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <FormVertical />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/quill-editor',
        element: (
          <PrivateRoute
            allowedRoles={[
              'SUPER_ADMIN',
              'PERMISSION_ADMIN',
              'CONTESTATION_ADMIN',
              'DEMANDE_ADMIN',
            ]}
          >
            <QuillEditor />
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
      { path: '/landingpage', element: <Landingpage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
