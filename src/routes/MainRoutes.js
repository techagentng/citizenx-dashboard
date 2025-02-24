import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const Settings = Loadable(lazy(() => import('views/Profile')));
const Compare = Loadable(lazy(() => import('views/compare')));
const Reports = Loadable(lazy(() => import('views/reports')));
const Rewards = Loadable(lazy(() => import('views/rewards')));
const Users = Loadable(lazy(() => import('views/users')));
const State = Loadable(lazy(() => import('views/states')));
const SubReportDetailsPage = Loadable(lazy(() => import('views/dashboard/subReportDetails')));
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
            path: '/compare',
            element: <Compare />
        },
        {
            path: '/users',
            element: <Users />
        },
        {
            path: '/state/:lga',
            element: <State />
        },
        {
            path: '/settings',
            element: <Settings />
        },
        {
            path: '/dashboard/sub_reports',
            element: <SubReportDetailsPage />
        }
    ]
};

export default MainRoutes;
