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
const CreateState = Loadable(lazy(() => import('views/states')));
const Callback = Loadable(lazy(() => import('views/pages/authentication/googleCallBack.js')));
const SubReportDetailsPage = Loadable(lazy(() => import('views/dashboard/subReportDetails')));
const SubReportStatePage = Loadable(lazy(() => import('views/dashboard/subReportState')));
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
            path: '/auth/callback',
            element: <Callback />
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
            path: '/state/create',
            element: <CreateState />
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
        },
        {
            path: '/dashboard/sub_report_state',
            element: <SubReportStatePage />
        }
    ]
};

export default MainRoutes;
