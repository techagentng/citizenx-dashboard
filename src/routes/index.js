import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
import Loadable from 'ui-component/Loadable';
const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));
const PagesAbout = Loadable(lazy(() => import('views/pages/about')));

const router = createBrowserRouter([{ path: '/', element: <PagesLanding /> },
{ path: '/about', element: <PagesAbout /> }, LoginRoutes, AuthenticationRoutes, MainRoutes], { basename: process.env.REACT_APP_BASE_NAME });

export default router;
