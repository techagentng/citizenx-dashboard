import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Settings = Loadable(lazy(() => import('views/Profile')));
const Reports = Loadable(lazy(() => import('views/reports')));
const Rewards = Loadable(lazy(() => import('views/rewards')));
const Users = Loadable(lazy(() => import('views/users')));
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
            path: '/reports',
            element: <Reports />
        },
        {
            path: '/rewards',
            element: <Rewards />
        },
        {
            path: '/users',
            element: <Users />
        },
        {
            path: '/settings',
            element: <Settings />
        }
    ]
};

export default MainRoutes;
