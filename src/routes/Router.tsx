import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import DemandeView from 'src/views/apps/demande/demande-view';
import { getToken } from 'src/services/authService';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce')));

/* ****Apps***** */
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogPost')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
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
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));

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

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = getToken();

  return token ? children : <Navigate to="/auth/login" />;
};

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboards/modern" /> },
      {
        path: '/dashboards/modern',
        exact: true,
        element: (
          <PrivateRoute>
            <ModernDash />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboards/demandes',
        exact: true,
        element: (
          <PrivateRoute>
            <DemandeView />
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboards/ecommerce',
        exact: true,
        element: (
          <PrivateRoute>
            <EcommerceDash />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/contacts',
        element: (
          <PrivateRoute>
            <Contacts />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/blog/posts',
        element: (
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/blog/detail/:id',
        element: (
          <PrivateRoute>
            <BlogDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/chats',
        element: (
          <PrivateRoute>
            <Chats />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/email',
        element: (
          <PrivateRoute>
            <Email />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/notes',
        element: (
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/tickets',
        element: (
          <PrivateRoute>
            <Tickets />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/ecommerce/shop',
        element: (
          <PrivateRoute>
            <Ecommerce />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/ecommerce/eco-product-list',
        element: (
          <PrivateRoute>
            <EcomProductList />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/ecommerce/eco-checkout',
        element: (
          <PrivateRoute>
            <EcomProductCheckout />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/ecommerce/detail/:id',
        element: (
          <PrivateRoute>
            <EcommerceDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/followers',
        element: (
          <PrivateRoute>
            <Followers />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/friends',
        element: (
          <PrivateRoute>
            <Friends />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/gallery',
        element: (
          <PrivateRoute>
            <Gallery />
          </PrivateRoute>
        ),
      },
      {
        path: '/user-profile',
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/apps/calendar',
        element: (
          <PrivateRoute>
            <Calendar />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/alert',
        element: (
          <PrivateRoute>
            <MuiAlert />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/accordion',
        element: (
          <PrivateRoute>
            <MuiAccordion />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/avatar',
        element: (
          <PrivateRoute>
            <MuiAvatar />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/chip',
        element: (
          <PrivateRoute>
            <MuiChip />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/dialog',
        element: (
          <PrivateRoute>
            <MuiDialog />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/list',
        element: (
          <PrivateRoute>
            <MuiList />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/popover',
        element: (
          <PrivateRoute>
            <MuiPopover />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/rating',
        element: (
          <PrivateRoute>
            <MuiRating />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/tabs',
        element: (
          <PrivateRoute>
            <MuiTabs />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/tooltip',
        element: (
          <PrivateRoute>
            <MuiTooltip />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/transfer-list',
        element: (
          <PrivateRoute>
            <MuiTransferList />
          </PrivateRoute>
        ),
      },
      {
        path: '/ui-components/typography',
        element: (
          <PrivateRoute>
            <MuiTypography />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/casl',
        element: (
          <PrivateRoute>
            <RollbaseCASL />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/treeview',
        element: (
          <PrivateRoute>
            <Treeview />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/pricing',
        element: (
          <PrivateRoute>
            <Pricing />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/faq',
        element: (
          <PrivateRoute>
            <Faq />
          </PrivateRoute>
        ),
      },
      {
        path: '/pages/account-settings',
        element: (
          <PrivateRoute>
            <AccountSetting />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/basic',
        element: (
          <PrivateRoute>
            <BasicTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/enhanced',
        element: (
          <PrivateRoute>
            <EnhanceTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/pagination',
        element: (
          <PrivateRoute>
            <PaginationTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/fixed-header',
        element: (
          <PrivateRoute>
            <FixedHeaderTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/collapsible',
        element: (
          <PrivateRoute>
            <CollapsibleTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/tables/search',
        element: (
          <PrivateRoute>
            <SearchTable />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/autocomplete',
        element: (
          <PrivateRoute>
            <MuiAutoComplete />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/button',
        element: (
          <PrivateRoute>
            <MuiButton />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/checkbox',
        element: (
          <PrivateRoute>
            <MuiCheckbox />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/radio',
        element: (
          <PrivateRoute>
            <MuiRadio />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/slider',
        element: (
          <PrivateRoute>
            <MuiSlider />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/date-time',
        element: (
          <PrivateRoute>
            <MuiDateTime />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/switch',
        element: (
          <PrivateRoute>
            <MuiSwitch />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-elements/switch',
        element: (
          <PrivateRoute>
            <MuiSwitch />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-layouts',
        element: (
          <PrivateRoute>
            <FormLayouts />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-custom',
        element: (
          <PrivateRoute>
            <FormCustom />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-wizard',
        element: (
          <PrivateRoute>
            <FormWizard />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-validation',
        element: (
          <PrivateRoute>
            <FormValidation />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-horizontal',
        element: (
          <PrivateRoute>
            <FormHorizontal />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/form-vertical',
        element: (
          <PrivateRoute>
            <FormVertical />
          </PrivateRoute>
        ),
      },
      {
        path: '/forms/quill-editor',
        element: (
          <PrivateRoute>
            <QuillEditor />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/area-chart',
        element: (
          <PrivateRoute>
            <AreaChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/line-chart',
        element: (
          <PrivateRoute>
            <LineChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/gredient-chart',
        element: (
          <PrivateRoute>
            <GredientChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/candlestick-chart',
        element: (
          <PrivateRoute>
            <CandlestickChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/column-chart',
        element: (
          <PrivateRoute>
            <ColumnChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/doughnut-pie-chart',
        element: (
          <PrivateRoute>
            <DoughnutChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/charts/radialbar-chart',
        element: (
          <PrivateRoute>
            <RadialbarChart />
          </PrivateRoute>
        ),
      },
      {
        path: '/widgets/cards',
        element: (
          <PrivateRoute>
            <WidgetCards />
          </PrivateRoute>
        ),
      },
      {
        path: '/widgets/banners',
        element: (
          <PrivateRoute>
            <WidgetBanners />
          </PrivateRoute>
        ),
      },
      {
        path: '/widgets/charts',
        element: (
          <PrivateRoute>
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
