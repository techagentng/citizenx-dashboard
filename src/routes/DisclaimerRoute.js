import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// other pages routing
// const Privacy = Loadable(lazy(() => import('views/pages/privacy')));
const Disclaimer = Loadable(lazy(() => import('views/pages/disclaimer')));
// const Terms = Loadable(lazy(() => import('views/pages/terms')));
// ==============================|| PUBLICATION ROUTING ||============================== //

const PrivacyRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MinimalLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/disclaimer2',
            element: <Disclaimer />
        }
    ]
};

export default PrivacyRoutes;
