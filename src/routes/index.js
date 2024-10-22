import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import PublicationRoutes from './PublicationRoutes';
<<<<<<< HEAD
=======
import PrivacyRoutes from './PrivacyRoute';
>>>>>>> upstream/main

// ==============================|| ROUTING RENDER ||============================== //
import Loadable from 'ui-component/Loadable';
// const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
<<<<<<< HEAD
const ComingSoon = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));


const router = createBrowserRouter([{ path: '/', element: <ComingSoon /> }, 
                                        AuthenticationRoutes, 
                                        LoginRoutes,
                                        PublicationRoutes, 
                                        MainRoutes], {
                                        basename: process.env.REACT_APP_BASE_NAME
                                    });
=======
// const ComingSoon = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));
const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const router = createBrowserRouter(
    [{ path: '/', element: <PagesLanding /> }, AuthenticationRoutes, LoginRoutes, PublicationRoutes, PrivacyRoutes, MainRoutes],
    {
        basename: process.env.REACT_APP_BASE_NAME
    }
);
>>>>>>> upstream/main

export default router;
