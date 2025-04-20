import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import PublicationRoutes from './PublicationRoutes';
import PrivacyRoutes from './PrivacyRoute';
import DisclaimerRoutes from './DisclaimerRoute';
import CommunityRoutes from './CommunityRoute';


// ==============================|| ROUTING RENDER ||============================== //
import Loadable from 'ui-component/Loadable';
const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
// const ComingSoon = Loadable(lazy(() => import('views/pages/maintenance/ComingSoon/ComingSoon2')));

const router = createBrowserRouter(
    [
        { path: '/', element: <PagesLanding /> },
        AuthenticationRoutes,
        LoginRoutes,
        PublicationRoutes,
        PrivacyRoutes,
        DisclaimerRoutes,
        CommunityRoutes,
        MainRoutes
    ],
    {
        basename: process.env.REACT_APP_BASE_NAME
    }
);


export default router;
