import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// other pages routing
const Write = Loadable(lazy(() => import('views/pages/publication/Write')));

<<<<<<< HEAD

=======
>>>>>>> upstream/main
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
<<<<<<< HEAD
        },
        
=======
        }
>>>>>>> upstream/main
    ]
};

export default PublicationRoutes;
