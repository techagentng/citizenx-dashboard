import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const AppMap = Loadable(lazy(() => import('views/application/map')));
const Reports = Loadable(lazy(() => import('views/reports')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/settings',
            element: <AppMap />
        },
        {
            path: '/reports',
            element: <Reports />
        }
    ]
};

export default MainRoutes;
