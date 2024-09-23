import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import PublicationRoutes from './PublicationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
import Loadable from 'ui-component/Loadable';
// const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
// const ComingSoon = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));
const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const router = createBrowserRouter(
    [{ path: '/', element: <PagesLanding /> }, AuthenticationRoutes, LoginRoutes, PublicationRoutes, MainRoutes],
    {
        basename: process.env.REACT_APP_BASE_NAME
    }
);

export default router;
