import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// other pages routing
const Community = Loadable(lazy(() => import('views/pages/communityGuidelines')));

// ==============================|| PUBLICATION ROUTING ||============================== //

const CommunityRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MinimalLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/community-rules',
            element: <Community />
        },
    ]
};

export default CommunityRoute;
