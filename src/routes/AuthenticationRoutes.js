import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
// import { element } from 'prop-types';

// other pages routing
const PagesAbout = Loadable(lazy(() => import('views/pages/about')));
const Publication = Loadable(lazy(() => import('views/pages/publication/home')));
const Privacy = Loadable(lazy(() => import('views/pages/privacy')));
const Disclaimer = Loadable(lazy(() => import('views/pages/disclaimer')));
const Terms = Loadable(lazy(() => import('views/pages/terms')));
const Community = Loadable(lazy(() => import('views/pages/communityGuidelines')));
const Cookies = Loadable(lazy(() => import('views/pages/cookies')));
const Help = Loadable(lazy(() => import('views/pages/help')));
const PagesHome = Loadable(lazy(() => import('views/pages/landing')));
const Callback = Loadable(lazy(() => import('views/pages/authentication/googleCallBack')));
// maintenance routing
const MaintenanceError = Loadable(lazy(() => import('views/pages/maintenance/Error')));
const MaintenanceComingSoon1 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon1')));
// const MaintenanceComingSoon2 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('views/pages/maintenance/UnderConstruction')));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/about',
            element: <PagesAbout />
        },
        {
            path: '/home',
            element: <PagesHome />
        },
        {
            path: '/publication',
            element: <Publication />
        },
        {

            path: '/privacy',
            element: <Privacy />
        },
        {
            path: '/disclaimer',
            element: <Disclaimer />
        },
        {
            path: '/terms',
            element: <Terms />
        },
        {
            path: '/cookies',
            element: <Cookies />
        },
        {
            path: '/guidelines',
            element: <Community />
        },
        {
            path: '/help',
            element: <Help />
        },
        {
            path: '/pages/error',
            element: <MaintenanceError />
        },
        {
            path: '/auth/callback',
            element: <Callback />
        },
        {
            path: '/pages/coming-soon1',
            element: <MaintenanceComingSoon1 />
        },
        {
            path: '/pages/under-construction',
            element: <MaintenanceUnderConstruction />
        }
    ]
};

export default AuthenticationRoutes;
