import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// other pages routing
const Write = Loadable(lazy(() => import('views/pages/publication/Write')));

// ==============================|| PUBLICATION ROUTING ||============================== //

const PublicationRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MinimalLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/publication/write',
            element: <Write />
        },
    ]
};

export default PublicationRoutes;
