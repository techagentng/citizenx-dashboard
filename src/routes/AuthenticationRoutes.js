import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// other pages routing
const PagesAbout = Loadable(lazy(() => import('views/pages/about')));
const Publication = Loadable(lazy(() => import('views/pages/publication/home')));
const Privacy = Loadable(lazy(() => import('views/pages/privacy')));
const PagesHome = Loadable(lazy(() => import('views/pages/landing')));

// maintenance routing
const MaintenanceError = Loadable(lazy(() => import('views/pages/maintenance/Error')));
const MaintenanceComingSoon1 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon1')));
const MaintenanceComingSoon2 = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));
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
            path: '/pages/error',
            element: <MaintenanceError />
        },
        {
            path: '/pages/coming-soon1',
            element: <MaintenanceComingSoon1 />
        },
        {
            path: '/pages/coming-soon2',
            element: <MaintenanceComingSoon2 />
        },
        {
            path: '/pages/under-construction',
            element: <MaintenanceUnderConstruction />
        }
    ]
};

export default AuthenticationRoutes;
