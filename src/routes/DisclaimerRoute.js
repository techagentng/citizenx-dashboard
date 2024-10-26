import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// other pages routing
const Disclaimer = Loadable(lazy(() => import('views/pages/disclaimer')));

// ==============================|| PUBLICATION ROUTING ||============================== //

const DisclaimerRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MinimalLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/disclaimer',
            element: <Disclaimer />
        }
    ]
};

export default DisclaimerRoutes;
